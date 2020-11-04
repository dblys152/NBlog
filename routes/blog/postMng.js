const express = require('express');
const router = express.Router();
const db_config = require('./../../config/database.js')
var conn = db_config.mysqlInit();
db_config.mysqlConnect(conn);

router.get('/:mbrNo/:postNo', function(req, res) {
  let mbrNo = req.params.mbrNo;
  let postNo = req.params.postNo;
  res.send('This is postMng! ' + mbrNo + '/' + postNo);
});

module.exports = router;
