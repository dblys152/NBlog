const express = require('express');
const router = express.Router();

const { jwtMW } = require('../config/jwtMW');       //jwt 미들웨어
router.use(jwtMW);

const blogRouter = require('./blog/controller/blogController');
const loginRouter = require('./login/controller/loginController');
router.use('/', blogRouter, loginRouter);

const commonRouter = require('./common/controller/commonController');
router.use('/common', commonRouter);

const mbrRouter = require('./member/controller/mbrController');
router.use('/member', mbrRouter);

const fileRouter = require('./common/controller/fileController');
router.use('/file', fileRouter);

module.exports = router;
