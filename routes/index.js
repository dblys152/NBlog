const express = require('express');
const router = express.Router();

const { jwtMW } = require('../middleware/jwtMW');       //jwt 미들웨어
router.use(jwtMW);

const blogController = require('./blog/controller/blogController');
router.use('/', blogController);

const loginController = require('./auth/controller/loginController');
router.use('/auth', loginController);

const commonController = require('./common/controller/commonController');
router.use('/common', commonController);

const mbrController = require('./member/controller/mbrController');
router.use('/mbr', mbrController);

const fileController = require('./common/controller/fileController');
router.use('/file', fileController);

module.exports = router;
