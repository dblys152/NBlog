const express = require('express');
const router = express.Router();

const homeRouter = require('./main/home.js')
const memberMngRouter = require('./member/memberMng.js');
const blogMngRouter = require('./blog/blogMng.js');
const postMngRouter = require('./blog/postMng.js');

router.use('/', homeRouter);
router.use('/member', memberMngRouter);
router.use('/blog', blogMngRouter, postMngRouter);

module.exports = router;
