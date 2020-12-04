const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();

const mbrService = require('../../services/member/mbrService');

router.post('/add', upload.array(), async (req, res) => {
    let { mbrEmail, mbrPw, mbrNknm } = req.body;
    let mbrEmailCnt = await mbrService.selectMbrEmailCnt(mbrEmail);
    if(mbrEmailCnt > 0) {           //이메일 중복        
        res.json({'ret': -2});
    } else if(mbrEmailCnt < 0){     //SELECT 오류
        res.json({'ret': -1});
    } else {
        let ret = await mbrService.insertMbr(mbrEmail, mbrPw, mbrNknm);
        res.json({'ret': ret});
    }
});

router.post('/mbrInfo', async (req, res) => {
    let mbrForm = req.body;
    let mbrInfo = await mbrService.selectMbrInfo(mbrForm);
    res.send(mbrInfo);
});

module.exports = router;
