const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        // ๐๐ป ๋ก๊ทธ์ธ ์ req.body๋ก ๋ฐ๋ key๊ฐ๋ค
        usernameField: 'email',
        passwordField: 'password',
      },
      // โญ๏ธ done = passport.authenticate์ ์ฝ๋ฐฑ ํจ์
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํ์ง ์์ต๋๋ค.' });
            }
          } else {
            done(null, false, { message: '๊ฐ์๋์ง ์์ ํ์์๋๋ค.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
