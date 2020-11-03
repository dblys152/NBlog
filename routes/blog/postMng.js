const express = require('express');
const router = express.Router();

router.get('/:mbrNo/:postNo', function(req, res) {
  let mbrNo = req.params.mbrNo;
  let postNo = req.params.postNo;
  res.send('This is postMng! ' + mbrNo + '/' + postNo);
});

module.exports = router;
