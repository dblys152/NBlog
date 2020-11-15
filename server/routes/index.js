const express = require('express');
const router = express.Router();

const homeRouter = require('./blog/home.js');
const blogMngRouter = require('./blog/blogMng.js');
const postMngRouter = require('./blog/postMng.js');
router.use('/', homeRouter, blogMngRouter, postMngRouter);

const mbrMngRouter = require('./member/mbrMng.js');
router.use('/member', mbrMngRouter);

console.log("This is index!");

module.exports = router;
