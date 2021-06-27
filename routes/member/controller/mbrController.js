const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer();

const mbrService = require('../service/mbrService');

router.post('', async (req, res, next) => {
    let { mbrEmail, mbrPw, mbrNknm } = req.body;
    if(mbrEmail == null || mbrEmail.toString().trim() == "") {
        return next({status: 400, message: "이메일이 존재하지 않습니다."});
    }
    if(mbrPw == null || mbrPw.toString().trim() == "") {
        return next({status: 400, message: "비밀번호가 존재하지 않습니다."});
    }
    if(mbrNknm == null || mbrNknm.toString().trim() == "") {
        return next({status: 400, message: "닉네임이 존재하지 않습니다."});
    }
    try {
        let mbrEmailCnt = await mbrService.selectMbrEmailCnt(mbrEmail);
        if(mbrEmailCnt > 0) {           //이메일 중복        
            res.status(404).json({message: "이메일이 중복됩니다."});
        } else {
            let regNo = 'M000000001';
            let mbrNo = await mbrService.insertMbr(mbrEmail, mbrPw, mbrNknm, null, regNo);
            res.status(201).json({message: "성공", data: {mbrNo: mbrNo}});
        }
    } catch(err) {
        next(err);
    }
});

router.post('/sns', async (req, res, next) => {
    let { smbrUid, smbrNknm, smbrEmail } = req.body;
    if(smbrUid == null || smbrUid.toString().trim() == "") {
        return next({status: 400, message: "UID가 존재하지 않습니다."});
    }
    if(smbrNknm == null || smbrNknm.toString().trim() == "") {
        return next({status: 400, message: "닉네임이 존재하지 않습니다."});
    }
    try {
        let regNo = 'M000000001';
        let mbrNo = await mbrService.insertMbr(smbrEmail, null, smbrNknm, smbrUid, regNo);
        res.status(201).json({message: "성공", data: {mbrNo: mbrNo}});
    } catch(err) {
        next(err);
    }
});

router.post('/mbrInfo', async (req, res, next) => {
    try {
        let mbrForm = req.body;
        let mbrInfo = await mbrService.selectMbrInfo(mbrForm);
        res.status(200).json({message: "성공", data: {mbrInfo}});
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
