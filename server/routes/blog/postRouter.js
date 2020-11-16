const express = require('express');
const router = express.Router();

const comCdService = require('../../services/common/comCdService.js');
const ctgService = require('../../services/common/ctgService.js');

router.get('/:mbrEmail/:postNo', function(req, res) {
    let mbrEmail = req.params.mbrEmail;
    let postNo = req.params.postNo;
    let comCdJson = {"upComCd" : comCdService.comCdData().pstDispCd};
    comCdService.selectComCdList(comCdJson, function(result) {
        let comCdStr = JSON.stringify(result);
        ctgService.selectCtgList(null, function(result) {
            res.send('This is postMng! ' + mbrEmail + '/' + postNo + ' : ' + comCdStr + JSON.stringify(result));
        });
    });
});

module.exports = router;