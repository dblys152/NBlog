const express = require('express');
const router = express.Router();

const comCdService = require('../../services/common/comCdService.js');
const ctgService = require('../../services/common/ctgService.js');

const comCdModel = require('../../models/common/comCdModel.js');

router.get('/', async (req, res) => {
    let mbrEmail = req.params.mbrEmail;
    let postNo = req.params.postNo;
    let comCdJson = {"upComCd" : comCdModel.comCdData().pstDispCd};
    try {
        let comCdList = await comCdService.selectComCdList(comCdJson);

        let comCdStr = JSON.stringify(comCdList);
        let ctgList = await ctgService.selectCtgList(null);
        res.send('This is postMng! ' + mbrEmail + '/' + postNo + ' : ' + comCdStr + JSON.stringify(ctgList));
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;