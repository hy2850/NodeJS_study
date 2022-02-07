// 회원가입, 로그인, 로그아웃 라우터
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12); // crypto 모듈의 pbkdf2로 대체 가능
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  // 👉🏻 Strategy 수행 (local strategy 구현은 passport/localStrategy.js에서)
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    // ⭐️ req.login이 serializeUser 호출 + user 객체 넘겨줌
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // ✨ 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/'); // 메인 페이지로 돌아가기
});

router.get('/kakao', passport.authenticate('kakao')); // 🤔 Q. no req.login? → 성공 시 kakao strategy 자체에서 호출함.

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);
// 🤔 Q. 왜 strategy 2번 실행?
// → 첫번째는 로그인 과정, 두 번째는 OAuth redirect related (https://www.oauth.com/oauth2-servers/redirect-uris/)

module.exports = router;
