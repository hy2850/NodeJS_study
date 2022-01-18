import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);

// Middleware 1
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행');
  next();
});

// Middleware 2, 3
app.get(
  '/',
  (req, res, next) => {
    console.log('GET / 요청에서만 실행'); // 🔥 Not res.send! -> ERR_HTTP_HEADERS_SENT
    next();
  },
  (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 감');
  },
);

// Middleware 4 - error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
  //   res.status(500);
});

app.listen(app.get('port'), () => {
  console.log(`Express listening at port ${app.get('port')}`);
});
