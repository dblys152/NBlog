const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/home.ejs', { title: 'Express' });
});

module.exports = router;