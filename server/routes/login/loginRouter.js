const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const jwt = require('jsonwebtoken');
const jwtKey = require('../../models/jwtKey.js');
const { jwtMW } = require('../../models/jwtMW.js');

const mbrService = require('../../services/member/mbrService');

/* 로그인 화면 */
router.get('/login', jwtMW, (req, res) => {
    let url = req.query.url;
    res.render('front/login/login.ejs', {...{url: url}, ...layoutJson});
});
//로그인
router.post('/login', async (req, res) => {
    let { url, mbrEmail, mbrPw } = req.body;
    let mbrInfo = await mbrService.selectLoginMbr(mbrEmail, mbrPw);
    if(mbrInfo != null) {
        console.log('Login Success!');
        //jwt 토큰 생성
        let accessToken = jwt.sign(
            {
                mbrNo: mbrInfo.MBR_NO
              , mbrEmail: mbrInfo.MBR_EMAIL
              , mbrNknm: mbrInfo.MBR_NKNM
            }
          , jwtKey.secret   //토큰 비밀키
          , {
                algorithm: "HS256"
              , expiresIn: "5m"
            }
        );
        //쿠키 등록
        res.cookie("mbr_jwt", accessToken, {httpOnly: true});
        if(url) {
            res.redirect(url);
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/common/other?flag=login');
    }
});

/* 로그아웃 */
router.get('/logout', jwtMW, (req, res) => {
    let url = req.query.url;
    res.cookie('mbr_jwt', '', {expires: new Date(0)});
    res.redirect(url == null || url == '' ? '/' : url);
});

/* 회원가입 화면 */
router.get('/signup', jwtMW, (req, res) => {
    res.render('front/login/signup.ejs', layoutJson);
});

/* 비밀번호 찾기 화면 */
router.get('/pw_reset', jwtMW, (req, res) => {
    res.render('front/login/pwReset.ejs', layoutJson);
});

module.exports = router;