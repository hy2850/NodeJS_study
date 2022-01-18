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

// Import routes
import indexRouter from './routes/index.js'; // ✨ cannot omit 'index.js' with node v16.13.0 (module resolution)
import userRouter from './routes/user.js';

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

// Use routes
app.use('/', indexRouter); // 👉🏻 http://localhost:3000
app.use('/user', userRouter); // 👉🏻 http://localhost:3000/user

// Handles unknown endpoints
app.use((req, res) => { // (req, res, next) - not gonna use next
  res.status(404).send('Not Found'); // ex) http://localhost:3000/random
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
  //   res.status(500);
});

app.listen(app.get('port'), () => {
  console.log(`Express listening at port ${app.get('port')}`);
});
