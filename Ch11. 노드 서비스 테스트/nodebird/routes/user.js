const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { addFollowing } = require('../controller/user');

const router = express.Router();

// 다른 유저 팔로우 기능
router.post('/:id/follow', isLoggedIn, addFollowing);

module.exports = router;
