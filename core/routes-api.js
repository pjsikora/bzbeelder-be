const express = require('express');
const router = express.Router();

const PostRouter = require('./modules/post/router');
const AuthRouter = require("./modules/auth/router");

router.use('/auth', AuthRouter);
router.use('/posts', PostRouter);

module.exports = router;
