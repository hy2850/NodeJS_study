import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

// ES6 No __dirname 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
// console.log(process.env.COOKIE_SECRET);

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행');
  next();
});

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

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
  //   res.status(500);
});

app.listen(app.get('port'), () => {
  console.log(`Express listening at port ${app.get('port')}`);
});
