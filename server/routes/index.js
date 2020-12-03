const express = require('express');
const router = express.Router();

const { jwtMW } = require('../config/jwtMW');       //jwt 미들웨어
router.use(jwtMW);

const blogRouter = require('./blog/blogRouter.js');
const loginRouter = require('./login/loginRouter.js');
router.use('/', blogRouter, loginRouter);

const commonRouter = require('./common/commonRouter.js');
router.use('/common', commonRouter);

const postRouter = require('./blog/postRouter.js');
router.use('/post', postRouter);

const mbrRouter = require('./member/mbrRouter.js');
router.use('/member', loginRouter, mbrRouter);

console.log("This is index!");

module.exports = router;
