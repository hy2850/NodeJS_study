import express from 'express';

const router = express.Router();

// GET /user 라우터 → 🚨 app.js에서 /user endpoint에서 router 호출하므로, 여기선 '/'에 GET
router.get('/', (req, res) => {
  console.log(req.query); // 👉🏻 http://localhost:3000/user?limit=5&skip=10
  res.send('Hello, User');
});

// 👉🏻 http://localhost:3000/user/1
router.get('/:id', (req, res) => {
  res.send(`Hello, User ${req.params.id}`);
});

// 👉🏻 http://localhost:3000/user/1/A
router.get('/:id/:class', (req, res) => {
  res.send(`Hello, User ${req.params.id} at ${req.params.class}`);
});

export default router;
