const express = require('express');
const router = express.Router();

const blogRouter = require('./blog/blogRouter.js');
const postRouter = require('./blog/postRouter.js');
router.use('/', blogRouter, postRouter);

const loginRouter = require('./member/loginRouter.js');
router.use('/login', loginRouter);

const mbrRouter = require('./member/mbrRouter.js');
router.use('/member', mbrRouter);

console.log("This is index!");

module.exports = router;
