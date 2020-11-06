const express = require('express');
const router = express.Router();
const comCd = require('./../common/comCd.js');

router.get('/:mbrNo/:postNo', function(req, res) {
  let mbrNo = req.params.mbrNo;
  let postNo = req.params.postNo;
  let comCdList = null;
  comCd.comCdList(function(err, result) {
    console.log(result[0].COM_CD_NM);
    comCdList = result[0].COM_CD_NM;
  });
  console.log('test1');
  console.log(comCdList);
  res.send('This is postMng! ' + mbrNo + '/' + postNo + ' : ' + comCdList);
});

module.exports = router;
