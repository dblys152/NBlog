const jwtKey = require('./jwtKey.js');
const jwt = require('jsonwebtoken');
const e = require('express');

/* jwt 토큰 생성 함수 */
let fn_accessToken = (mbrNo, mbrNknm, mbrEmail, smbrUid, snsToken, sns) => {
    let accessToken = jwt.sign(
        {
            mbrNo: mbrNo
          , mbrNknm: mbrNknm
          , mbrEmail: (mbrEmail == null ? '' : mbrEmail)
          , smbrUid: (smbrUid == null ? '' : smbrUid)
          , snsToken: (snsToken == null ? '' : snsToken)
          , sns: (sns == null ? '' : sns)
        }
      , jwtKey.secret   //토큰 비밀키
      , {
            algorithm: "HS256"
          , expiresIn: "20m"
        }
    );
    return accessToken;
}
exports.fn_accessToken = fn_accessToken;

/* jwt 토큰 인증 */
exports.jwtMW = function(req, res, next){
    let accessToken = req.cookies.mbr_jwt;

    if (accessToken){
        try{  
            let payload = jwt.verify(accessToken, jwtKey.secret);   //token decode
            console.log(payload);
            req.verify = true;
            res.locals.payload = payload;
            accessToken = fn_accessToken(payload.mbrNo, payload.mbrNknm, payload.mbrEmail, payload.smbrUid, payload.snsToken, payload.sns);
            res.cookie("mbr_jwt", accessToken, {httpOnly: true});   //쿠키 재등록 (만료 시간 갱신)
            next();
        } catch(e){
            console.log('Session expiration!');
            req.verify = false;
            res.locals.payload = {};
            next();
            //return res.status(401).send();
        }
    } else {
        res.locals.payload = {};
        next();
    } 
}