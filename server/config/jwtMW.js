const jwtKey = require('./jwtKey.js');
const jwt = require('jsonwebtoken');

exports.jwtMW = function(req, res, next){
    let accessToken = req.cookies.mbr_jwt;

    if (accessToken){
        try{  
            let payload = jwt.verify(accessToken, jwtKey.secret);   //token decode
            res.locals.mbrNo = payload.mbrNo;
            res.locals.mbrNknm = payload.mbrNknm;
            res.locals.mbrEmail = payload.mbrEmail;
            res.locals.smbrUid = payload.smbrUid;
            res.locals.snsToken = payload.snsToken;
            res.locals.sns = payload.sns;
            next();
        } catch(e){
            console.log('Session expiration!');
            res.locals.mbrNo = '';
            res.locals.mbrNknm = '';
            res.locals.mbrEmail = '';
            res.locals.smbrUid = '';
            res.locals.snsToken = '';
            res.locals.sns = '';
            next();
            //return res.status(401).send();
        }
    } else {
        res.locals.mbrNo = '';
        res.locals.mbrNknm = '';
        res.locals.mbrEmail = '';
        res.locals.smbrUid = '';
        res.locals.snsToken = '';
        res.locals.sns = '';
        next();
    } 
}