const express = require('express');
const router = express.Router();
const dbConfig = require('../../database/config/dbConn');

/* GET users listing. */
router.get('/mbrInfo', function(req, res, next) {
  res.json('{"mbrNo": "M000000002", "mbrEmail": "l1523@naver.com", "mbrNknm": "영트"}');
});

module.exports = router;
