const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('...');
});

router.get('/:mbrNo', function(req, res) {
    let mbrNo = req.params.mbrNo;
    let postNo = req.params.postNo;
    res.send('This is blogMng! ' + mbrNo);
});

module.exports = router;
