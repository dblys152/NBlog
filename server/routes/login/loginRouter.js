const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const jwt = require('jsonwebtoken');
const { fn_accessToken } = require('../../config/jwtMW');
const request = require('request');

const mbrService = require('../../services/member/mbrService');

/* 로그인 화면 */
router.get('/login', (req, res) => {
    let url = req.query.url;
    if(req.verify) res.redirect(url == null || url == '' ? '/' : url)
    else res.render('front/login/login.ejs', {...{url: url}, ...layoutJson});
});

/* 회원 로그인 */
router.post('/login', async (req, res) => {
    let { url, mbrEmail, mbrPw } = req.body;
    let mbrInfo = await mbrService.selectLoginMbr(res, mbrEmail, mbrPw, null);
    if(mbrInfo != null) {
        console.log('Login Success!');
        await mbrService.updateMbrLoginDtt(res, mbrInfo.MBR_NO, null);   //마지막 로그인 일시 업데이트
        let accessToken = fn_accessToken(mbrInfo.MBR_NO, mbrInfo.MBR_NKNM, mbrInfo.MBR_EMAIL, null, null, null);    //jwt 토큰 생성
        res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
        res.redirect(url == null || url == '' ? '/' : url);
    } else {
        await mbrService.updateMbrPwErr(res, mbrEmail); //회원 비밀번호 오류 횟수 증가
        res.redirect('/common/other?flag=login');
    }
});

/* 네이버 연동 회원가입 이동 및 로그인 */
router.get('/naverLoginCall', (req, res) => {
    let client_secret = 'N_bLU_lWYx';
    let client_id = 'WqpFj01vvHM5pzWBvB6f';
    let redirectURI = encodeURI("http://localhost:3000/naverLoginCall");
    let url = req.query.state;
    let code = req.query.code;
    let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code;
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let token = JSON.parse(body);
            let header = "Bearer " + token.access_token;
            options = {
                url: 'https://openapi.naver.com/v1/nid/me',
                headers: {'Authorization': header}
            };
            request.get(options, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let result = JSON.parse(body).response;
                    let smbrInfo = await mbrService.selectLoginMbr(res, null, null, result.id);
                    if(smbrInfo != null) {
                        await mbrService.updateMbrLoginDtt(res, null, smbrInfo.MBR_NO);  //마지막 로그인 일시 업데이트
                        let accessToken = fn_accessToken(smbrInfo.MBR_NO, smbrInfo.MBR_NKNM, null, smbrInfo.SMBR_UID, token.access_token, 'naver');  //jwt 토큰 생성
                        res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
                        res.redirect(url == null || url == '' ? '/' : url);
                    } else {
                        result.nickname = result.nickname == null ? '' : result.nickname;
                        result.email = result.email == null ? '' : result.email;
                        res.render('front/login/snsSignup.ejs', {...result, ...layoutJson});
                    }
                } else {
                    console.log('error'); 
                    if(response != null) {
                        //res.status(response.statusCode).end();
                        console.log('error = ' + response.statusCode);
                    }
                    res.redirect(url == null || url == '' ? '/login' : url);
                }
            });
        } else {
            //res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            console.log('response: ' + JSON.stringify(response));
            res.redirect(url == null || url == '' ? '/login' : url);
        }
    });
});

/* 카카오 연동 회원가입 이동 및 로그인 */
router.get('/kakaoLoginCall', (req, res) => {
    let client_secret = 'uwEEM54A7kc3H7UHd8ihs7ujemtpXgpQ';
    let client_id = '390bd20f4240efdcb3be81e1c556beb8';
    let redirectURI = encodeURI("http://localhost:3000/kakaoLoginCall");
    let url = req.query.state;
    let code = req.query.code;
    let options = {
        url: 'https://kauth.kakao.com/oauth/token',
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
            let header = "Bearer " + token.access_token;
            options = {
                url: 'https://kapi.kakao.com/v2/user/me',
                headers: {'Authorization': header}
            };
            request.get(options, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let result = JSON.parse(body);
                    let smbrInfo = await mbrService.selectLoginMbr(res, null, null, result.id);
                    if(smbrInfo != null) {
                        await mbrService.updateMbrLoginDtt(res, null, smbrInfo.MBR_NO);  //마지막 로그인 일시 업데이트
                        let accessToken = fn_accessToken(smbrInfo.MBR_NO, smbrInfo.MBR_NKNM, null, smbrInfo.SMBR_UID, token.access_token, 'kakao');  //jwt 토큰 생성
                        res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
                        res.redirect(url == null || url == '' ? '/' : url);
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
                        //res.status(response.statusCode).end();
                        console.log('error = ' + response.statusCode);
                    }
                    res.redirect(url == null || url == '' ? '/login' : url);
                }
            });
        } else {
            //res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            console.log('response: ' + JSON.stringify(response.body));
            res.redirect(url == null || url == '' ? '/login' : url);
        }
    });
});

/* 로그아웃 */
router.get('/logout', (req, res) => {
    let url = req.query.url;
    if(req.query.state != null && req.query.state != '') {
        url = req.query.state;
    }
    if(req.query.sns == 'naver') {
        let options = {
            url: 'https://nid.naver.com/nidlogin.logout'
        };
        request.post(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.cookie('mbr_jwt', '', {expires: new Date(0)});
                res.redirect(url == null || url == '' ? '/' : url);
            } else {
                console.log('error');
                if(response != null) {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            }
        });
    } else {
        res.cookie('mbr_jwt', '', {expires: new Date(0)});
        res.redirect(url == null || url == '' ? '/' : url);
    }
});

/* 비밀번호 찾기 화면 */
router.get('/pw_reset', (req, res) => {
    if(req.verify) res.redirect('/');
    else res.render('front/login/pwReset.ejs', layoutJson);
});

/* 회원가입 화면 */
router.get('/signup', (req, res) => {
    if(req.verify) res.redirect('/');
    else res.render('front/login/signup.ejs', layoutJson);
});

module.exports = router;