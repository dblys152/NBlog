const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const jwt = require('jsonwebtoken');
const jwtKey = require('../../config/jwtKey.js');

const mbrService = require('../../services/member/mbrService');

/* 로그인 화면 */
router.get('/login', (req, res) => {
    let url = req.query.url;
    res.render('front/login/login.ejs', {...{url: url}, ...layoutJson});
});
//로그인
router.post('/login', async (req, res) => {
    let { url, mbrEmail, mbrPw } = req.body;
    try {
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
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

/* 로그아웃 */
router.get('/logout', (req, res) => {
    let url = req.query.url;
    res.cookie('mbr_jwt', '', {expires: new Date(0)});
    res.redirect(url == null || url == '' ? '/' : url);
});

/* 회원가입 화면 */
router.get('/signup', (req, res) => {
    res.render('front/login/signup.ejs', layoutJson);
});

/* 비밀번호 찾기 화면 */
router.get('/pw_reset', (req, res) => {
    res.render('front/login/pwReset.ejs', layoutJson);
});

/* SNS 회원가입 화면 */
router.get('/sns/signup', (req, res) => {
    res.render('front/login/snsSignup.ejs', layoutJson);
});

const client_id = 'WqpFj01vvHM5pzWBvB6f';
const client_secret = 'N_bLU_lWYx';
const redirectURI = encodeURI("http://localhost:3000/sns/signup");
router.get('/naverLoginCall', (req, res) => {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    let request = require('request');
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log({...JSON.parse(body), ...layoutJson});
            res.render('front/login/snsSignup.ejs', {...JSON.parse(body), ...layoutJson});
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

module.exports = router;