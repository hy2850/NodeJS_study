import express from 'express';

const router = express.Router();

// GET /user λΌμ°ν° β π¨ app.jsμμ /user endpointμμ router νΈμΆνλ―λ‘, μ¬κΈ°μ  '/'μ GET
router.get('/', (req, res) => {
  console.log(req.query); // ππ» http://localhost:3000/user?limit=5&skip=10
  res.send('Hello, User');
});

// ππ» http://localhost:3000/user/1
router.get('/:id', (req, res) => {
  res.send(`Hello, User ${req.params.id}`);
});

// ππ» http://localhost:3000/user/1/A
router.get('/:id/:class', (req, res) => {
  res.send(`Hello, User ${req.params.id} at ${req.params.class}`);
});

export default router;
