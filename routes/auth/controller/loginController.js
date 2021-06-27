const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const jwt = require('jsonwebtoken');
const { fn_accessToken } = require('../../../middleware/jwtMW');
const request = require('request');

const mbrService = require('../../member/service/mbrService');

/* 로그인 토큰발급 API */
router.post('/token', async (req, res, next) => {
    let { url, mbrEmail, mbrPw } = req.body;
    if(mbrEmail == null || mbrEmail.toString().trim() == "") {
        return next({status: 400, message: "이메일이 존재하지 않습니다."});
    }
    if(mbrPw == null || mbrPw.toString().trim() == "") {
        return next({status: 400, message: "비밀번호가 존재하지 않습니다."});
    }
    try {
        let mbrInfo = await mbrService.selectLoginMbr(mbrEmail, mbrPw, null);
        if(mbrInfo != null) {
            await mbrService.updateMbrLoginDtt(mbrInfo.MBR_NO, null);   //마지막 로그인 일시 업데이트
            let accessToken = fn_accessToken(mbrInfo.MBR_NO, mbrInfo.MBR_NKNM, mbrInfo.MBR_EMAIL, null, null, null);    //jwt 토큰 생성
            //res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
            res.status(201).json({message: "성공", data: {access_token: accessToken, url: url}});
        } else {
            await mbrService.updateMbrPwErr(mbrEmail); //회원 비밀번호 오류 횟수 증가
            res.status(404).json({message: "사용자 정보가 일치하지 않습니다."});
        }
    } catch(err) {
        next(err);
    }
});

/* 네이버 로그인 토큰발급 API */
router.get('/token/naver', async (req, res, next) => {
    try {
        let client_secret = 'N_bLU_lWYx';
        let client_id = 'WqpFj01vvHM5pzWBvB6f';
        let redirectURI = encodeURI("http://localhost:3000/auth/token/naver");
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
                        let smbrInfo = await mbrService.selectLoginMbr(null, null, result.id);
                        if(smbrInfo != null) {
                            await mbrService.updateMbrLoginDtt(null, smbrInfo.MBR_NO);  //마지막 로그인 일시 업데이트
                            let accessToken = fn_accessToken(smbrInfo.MBR_NO, smbrInfo.MBR_NKNM, null, smbrInfo.SMBR_UID, token.access_token, 'naver');  //jwt 토큰 생성
                            //res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
                            res.status(201).json({message: "성공", data: {access_token: accessToken, url: url}});
                        } else {
                            result.nickname = result.nickname == null ? '' : result.nickname;
                            result.email = result.email == null ? '' : result.email;
                            res.status(201).json({message: "회원가입이 필요합니다.", data: result});
                            //res.render('front/login/snsSignup.ejs', {...result, ...layoutJson});
                        }
                    } else {
                        res.status(404).json({message: "로그인 정보가 잘못되었습니다."});
                    }
                });
            } else {
                res.status(404).json({message: "로그인 정보가 잘못되었습니다."});
            }
        });
    } catch(err) {
        next(err);
    }
});

/* 카카오 로그인 토큰발급 API */
router.get('/token/kakao', async (req, res, next) => {
    try {
        let client_secret = 'uwEEM54A7kc3H7UHd8ihs7ujemtpXgpQ';
        let client_id = '390bd20f4240efdcb3be81e1c556beb8';
        let redirectURI = encodeURI("http://localhost:3000/auth/token/kakao");
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
                console.log(body);
                let token = JSON.parse(body);
                let header = "Bearer " + token.access_token;
                options = {
                    url: 'https://kapi.kakao.com/v2/user/me',
                    headers: {'Authorization': header}
                };
                request.get(options, async (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        let result = JSON.parse(body);
                        let smbrInfo = await mbrService.selectLoginMbr(null, null, result.id.toString());
                        if(smbrInfo != null) {
                            await mbrService.updateMbrLoginDtt(null, smbrInfo.MBR_NO);  //마지막 로그인 일시 업데이트
                            let accessToken = fn_accessToken(smbrInfo.MBR_NO, smbrInfo.MBR_NKNM, null, smbrInfo.SMBR_UID, token.access_token, 'kakao');  //jwt 토큰 생성
                            //res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 등록
                            res.status(201).json({message: "성공", data: {access_token: accessToken, url: url}});
                        } else {
                            resultForm = {};
                            resultForm.id = result.id;
                            resultForm.nickname = result.kakao_account.profile.nickname;
                            resultForm.email = result.kakao_account.email;
                            res.status(201).json({message: "회원가입이 필요합니다.", data: result});
                            //res.render('front/login/snsSignup.ejs', {...resultForm, ...layoutJson});
                        }
                    } else {
                        res.status(404).json({message: error});
                    }
                });
            } else {
                res.status(404).json({message: error});
            }
        });
    } catch(err) {
        next(err);
    }
});


/* 로그인 화면 */
router.get('/login', (req, res, next) => {
    let url = req.query.url;
    if(req.verify) res.redirect(url == null || url == '' ? '/' : url)
    else res.render('front/login/login.ejs', {...{url: url}, ...layoutJson});
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