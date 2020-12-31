const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const jwt = require('jsonwebtoken');
const jwtKey = require('../../config/jwtKey.js');

const mbrService = require('../../services/member/mbrService');

/* jwt 토큰 생성 함수 */
let fn_accessToken = (mbrNo, mbrEmail, smbrUid, mbrNknm) => {
    let accessToken = jwt.sign(
        {
            mbrNo: mbrNo
          , mbrEmail: (mbrEmail == null ? '' : mbrEmail)
          , smbrUid: (smbrUid == null ? '' : smbrUid)
          , mbrNknm: mbrNknm
        }
      , jwtKey.secret   //토큰 비밀키
      , {
            algorithm: "HS256"
          , expiresIn: "5m"
        }
    );
    return accessToken;
}

/* 로그인 화면 */
router.get('/login', (req, res) => {
    let url = req.query.url;
    res.render('front/login/login.ejs', {...{url: url}, ...layoutJson});
});

/* 회원 로그인 */
router.post('/login', async (req, res) => {
    let { url, mbrEmail, mbrPw } = req.body;
    try {
        let mbrInfo = await mbrService.selectLoginMbr(mbrEmail, mbrPw, null);
        if(mbrInfo != null) {
            console.log('Login Success!');
            await mbrService.updateMbrLoginDtt(mbrInfo.MBR_NO, null);   //마지막 로그인 일시 업데이트
            let accessToken = fn_accessToken(mbrInfo.MBR_NO, mbrInfo.MBR_EMAIL, null, mbrInfo.MBR_NKNM);    //jwt 토큰 생성
            res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
            if(url) {
                res.redirect(url);
            } else {
                res.redirect('/');
            }
        } else {
            await mbrService.updateMbrPwErr(mbrEmail); //회원 비밀번호 오류 횟수 증가
            res.redirect('/common/other?flag=login');
        }
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

/* 네이버 연동 회원가입 및 로그인 */
router.get('/naverLoginCall', (req, res) => {
    let client_secret = 'N_bLU_lWYx';
    let client_id = 'WqpFj01vvHM5pzWBvB6f';
    let redirectURI = encodeURI("http://localhost:3000/naverLoginCall");
    let url = req.query.state;
    let code = req.query.code;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code;
    let request = require('request');
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let token = JSON.parse(body);
            api_url = 'https://openapi.naver.com/v1/nid/me';
            let header = "Bearer " + token.access_token;
            console.log(header);
            options = {
                url: api_url,
                headers: {'Authorization': header}
            };
            request.get(options, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let result = JSON.parse(body).response;
                    let smbrInfo = await mbrService.selectLoginMbr(null, null, result.id);
                    if(smbrInfo != null) {
                        await mbrService.updateMbrLoginDtt(null, smbrInfo.MBR_NO);  //마지막 로그인 일시 업데이트
                        let accessToken = fn_accessToken(smbrInfo.MBR_NO, null, smbrInfo.SMBR_UID, smbrInfo.MBR_NKNM);  //jwt 토큰 생성
                        res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
                        if(url) {
                            res.redirect(url);
                        } else {
                            res.redirect('/');
                        }
                    } else {
                        res.render('front/login/snsSignup.ejs', {...result, ...layoutJson});
                    }
                } else {
                    console.log('error');
                    if(response != null) {
                        res.status(response.statusCode).end();
                        console.log('error = ' + response.statusCode);
                    }
                }
            });
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            console.log('response: ' + JSON.stringify(response.body));
        }
    });
});

/* 카카오 연동 회원가입 및 로그인 */
router.get('/kakaoLoginCall', (req, res) => {
    let client_secret = 'uwEEM54A7kc3H7UHd8ihs7ujemtpXgpQ';
    let client_id = '390bd20f4240efdcb3be81e1c556beb8';
    let redirectURI = encodeURI("http://localhost:3000/kakaoLoginCall");
    let url = req.query.state;
    let code = req.query.code;
    api_url = 'https://kauth.kakao.com/oauth/token';
    let request = require('request');
    let options = {
        url: api_url,
        form: {
            "grant_type": "authorization_code"
          , "client_id": client_id
          , "client_secret": client_secret
          , "redirect_uri": redirectURI
          , "code": code
        }
    };
    request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let token = JSON.parse(body);
            api_url = 'https://kapi.kakao.com/v2/user/me';
            let header = "Bearer " + token.access_token;
            options = {
                url: api_url,
                headers: {'Authorization': header}
            };
            request.get(options, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let result = JSON.parse(body);
                    let smbrInfo = await mbrService.selectLoginMbr(null, null, result.id);
                    if(smbrInfo != null) {
                        await mbrService.updateMbrLoginDtt(null, smbrInfo.MBR_NO);  //마지막 로그인 일시 업데이트
                        let accessToken = fn_accessToken(smbrInfo.MBR_NO, null, smbrInfo.SMBR_UID, smbrInfo.MBR_NKNM);  //jwt 토큰 생성
                        res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
                        if(url) {
                            res.redirect(url);
                        } else {
                            res.redirect('/');
                        }
                    } else {
                        resultForm = {};
                        resultForm.id = result.id;
                        resultForm.nickname = result.kakao_account.profile.nickname;
                        resultForm.email = result.kakao_account.email;
                        res.render('front/login/snsSignup.ejs', {...resultForm, ...layoutJson});
                    }
                } else {
                    console.log('error');
                    if(response != null) {
                        res.status(response.statusCode).end();
                        console.log('error = ' + response.statusCode);
                    }
                }
            });
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            console.log('response: ' + JSON.stringify(response.body));
        }
    });
});

/* 로그아웃 */
router.get('/logout', (req, res) => {
    let url = req.query.url;
    res.cookie('mbr_jwt', '', {expires: new Date(0)});
    res.redirect(url == null || url == '' ? '/' : url);
});

/* 비밀번호 찾기 화면 */
router.get('/pw_reset', (req, res) => {
    res.render('front/login/pwReset.ejs', layoutJson);
});

/* 회원가입 화면 */
router.get('/signup', (req, res) => {
    res.render('front/login/signup.ejs', layoutJson);
});

module.exports = router;