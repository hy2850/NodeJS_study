// 로그인 여부에 따라 접근 권한을 제어하는 미들웨어
// imposes access restriction according to user's sign-in status

const jwt = require('jsonwebtoken');

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

// JWT 토큰 인증 받기 - ⭐️ 대부분 라우터에 공통으로 쓰여서 middleware로 만듦
exports.verifyToken = (req, res, next) => {
  try {
    // 토큰 → 사용자가 req.headers.authorization에 넣어서 보냄
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); // returns decoded payload if signature is valid
    return next();
  } catch (error) {
    // document에 에러 종류 나와있음
    if (error.name === 'TokenExpiredError') {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};
