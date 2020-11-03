const express = require('express');
const router = express.Router();

const homeRouter = require('./main/home.js')
const userMngRouter = require('./user/userMng.js');
const postMngRouter = require('./blog/postMng.js');

router.use('/', homeRouter);
router.use('/user', userMngRouter);
router.use('/blog', postMngRouter);

module.exports = router;
