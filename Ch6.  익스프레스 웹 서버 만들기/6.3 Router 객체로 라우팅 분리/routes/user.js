import express from 'express';

const router = express.Router();

// GET /user 라우터 → 🚨 app.js에서 /user endpoint에서 router 호출하므로, 여기선 '/'에 GET
router.get('/', (req, res) => {
  res.send('Hello, User');
});

export default router;
