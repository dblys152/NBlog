const express = require('express');
const router = express.Router();
const comCd = require('./../common/comCd.js');

router.get('/:mbrNo/:postNo', function(req, res) {
  let mbrNo = req.params.mbrNo;
  let postNo = req.params.postNo;
  let comCdList = comCd.comCdList();
  console.log('test1');
  console.log(comCdList);
  res.send('This is postMng! ' + mbrNo + '/' + postNo + ' : ');
});

module.exports = router;
