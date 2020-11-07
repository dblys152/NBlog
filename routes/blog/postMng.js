const express = require('express');
const router = express.Router();
const dbConfig = require('../../config/database.js');
const comCdModule = require('../common/comCd.js');

router.get('/:mbrNo/:postNo', function(req, res) {
  let mbrNo = req.params.mbrNo;
  let postNo = req.params.postNo;
  let comCd = comCdModule.comCdData().pstDispCd;
  comCdModule.selectComCdList(comCd, function(result) {
    console.log(result);
    res.send('This is postMng! ' + mbrNo + '/' + postNo + ' : ');
  });
});

module.exports = router;
