const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();

const mbrService = require('../../services/member/mbrService');

router.post('/add', upload.array(), async (req, res) => {
    let { mbrEmail, mbrPw, mbrNknm } = req.body;
    let mbrEmailCnt = await mbrService.selectMbrEmailCnt(res, mbrEmail);
    if(mbrEmailCnt > 0) {           //이메일 중복        
        res.json({'ret': -2});
    } else if(mbrEmailCnt < 0){     //SELECT 오류
        res.json({'ret': -1});
    } else {
        await mbrService.insertMbr(res, mbrEmail, mbrPw, mbrNknm, null);
        res.json({'ret': 1});
    }
});

router.post('/sns/add', upload.array(), async (req, res) => {
    let { smbrNknm, smbrUid, smbrEmail } = req.body;
    await mbrService.insertMbr(res, smbrEmail, null, smbrNknm, smbrUid);
    res.json({'ret': 1});
});

router.post('/mbrInfo', async (req, res) => {
    let mbrForm = req.body;
    let mbrInfo = await mbrService.selectMbrInfo(res, mbrForm);
    res.send(mbrInfo);
});

module.exports = router;
