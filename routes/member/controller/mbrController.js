const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();

const mbrService = require('../service/mbrService');

router.post('/add', upload.array(), async (req, res, next) => {
    try {
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
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.post('/sns/add', upload.array(), async (req, res, next) => {
    try {
        let { smbrNknm, smbrUid, smbrEmail } = req.body;
        await mbrService.insertMbr(res, smbrEmail, null, smbrNknm, smbrUid);
        res.res.status(204).json({'message': "성공"});
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.post('/mbrInfo', async (req, res, next) => {
    try {
        let mbrForm = req.body;
        let mbrInfo = await mbrService.selectMbrInfo(res, mbrForm);
        res.status(200).json({message: "성공", data: {mbrInfo}});
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
