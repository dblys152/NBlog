const express = require('express');
const router = express.Router();

const homeRouter = require('./blog/home.js')
router.use('/', homeRouter);

const memberMngRouter = require('./member/memberMng.js');
router.use('/member', memberMngRouter);

const blogMngRouter = require('./blog/blogMng.js');
const postMngRouter = require('./blog/postMng.js');
router.use('/blog', blogMngRouter, postMngRouter);


module.exports = router;
