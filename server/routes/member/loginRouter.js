const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtKey = require('../../models/jwtKey.js');

const mbrService = require('../../services/member/mbrService');

router.post('/', async (req, res) => {
    let { mbrEmail, mbrPw } = req.body;
    let mbrInfo = await mbrService.selectLoginMbr(mbrEmail, mbrPw);
    if(mbrInfo != null) {
        res.cookie("mbr", tokenCrt);
        res.send({"ret": 1});
    } else {
        res.send({"ret": -1});
    }
});

let tokenCrt = (mbrInfo) => {
    return jwt.sign(mbrInfo, jwtKey.secret, {expiresIn: '5m'});
}

module.exports = router;