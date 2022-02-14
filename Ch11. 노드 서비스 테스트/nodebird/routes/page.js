const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

// init to 0 → will be populated soon
router.use((req, res, next) => {
  res.locals.user = req.user; // (9.3.1 Passport) null → req.user (⭐️ populated by Passport deserialize)
  res.locals.followerCount = req.user ? req.user.Followers.length : 0; // (9.5) Followers info added in deserialize
  res.locals.followingCount = req.user ? req.user.Followings.length : 0; // (9.5) Followings info added in deserialize
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((usr) => usr.id)
    : [];
  next();
});

// ⭐️ Multiple middlewares used in a single router
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Hashtag 검색기능 (관련 post 불러오기)
router.get('/hashtag', async (req, res, next) => {
  // ✨ form GET request니까, req.query에 정보 담김
  console.log(req.query);
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] }); // Post w/ User info
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
