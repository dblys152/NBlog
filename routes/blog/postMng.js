const express = require('express');
const router = express.Router();
const dbConfig = require('./../../config/database.js');
const comCd = require('./../common/comCd.js');

router.get('/:mbrNo/:postNo', function(req, res) {
  let mbrNo = req.params.mbrNo;
  let postNo = req.params.postNo;
  let comCdList = null;
  comCd.comCdList(function(err, result) {
    console.log(result);
    comCdList = result[0].COM_CD_NM;
    res.send('This is postMng! ' + mbrNo + '/' + postNo + ' : ' + comCdList);
  });
});

module.exports = router;
