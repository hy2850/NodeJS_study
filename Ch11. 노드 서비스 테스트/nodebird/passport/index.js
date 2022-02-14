const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // ⭐️ 로그인 요청 들어올 시 req.login에 의해 실행; req.session에 user.id 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // ⭐️ 매 요청마다 실행; req.session에 저장된 user.id로 DB에서 유저 정보 fetch; req.user 생성
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      // 9.5 - req.user에 팔로워, 팔로잉 목록 저장
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        },
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followings',
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
