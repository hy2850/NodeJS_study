// 로그인 여부에 따라 접근 권한을 제어하는 미들웨어
// imposes access restriction according to user's sign-in status

exports.isLoggedIn = (req, res, next) => {
  // ⭐️ 로그인 여부 체크 (Passport가 req 객체에 추가해준 함수)
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
