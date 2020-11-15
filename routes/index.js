const express = require('express');
const router = express.Router();

const homeRouter = require('./blog/home.js');
const blogMngRouter = require('./blog/blogMng.js');
const postMngRouter = require('./blog/postMng.js');
router.use('/', homeRouter, blogMngRouter, postMngRouter);

const memberMngRouter = require('./member/memberMng.js');
router.use('/member', memberMngRouter);

router.use('/blog', blogMngRouter, postMngRouter);

console.log("This is index!");

module.exports = router;
