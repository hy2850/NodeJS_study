const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 받기
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` }); // 👉🏻 이미지 저장 위치 클라이언트에게 알림
});

// 게시글 업로드 처리 - 이미지 아니여도 multipart라서 multer로 처리
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    // ⭐️ 해시 태그와 게시글 연결 (p.439 그림 9-21 참고)
    /*
    ex)
    hashtags = ['#노드', '#익스프레스']
    → (hashtag.map) [findOrCreate, findOrCreate]
    → (Promise.all로 모두 실행) [[모델, bool], [모델, bool]]
    → (result.map(r => r[0])) [모델, 모델]
    → post.addHashtag()
    */
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          // 👉🏻 findOrCreate : find if exists, create new one if not
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        }),
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
