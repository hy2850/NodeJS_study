const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      // profile로 유저 정보 넘겨줌 (https://www.passportjs.org/packages/passport-kakao/#:~:text=//%20%EC%82%AC%EC%9A%A9%EC%9E%90%EC%9D%98%20%EC%A0%95%EB%B3%B4%EB%8A%94%20profile%EC%97%90%20%EB%93%A4%EC%96%B4%EC%9E%88%EB%8B%A4.)
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
