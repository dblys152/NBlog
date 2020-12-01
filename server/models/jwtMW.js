const jwtKey = require('./jwtKey.js');
const jwt = require('jsonwebtoken');

exports.jwtMW = function(req, res, next){
    let accessToken = req.cookies.mbr_jwt;

    if (accessToken){
        try{  
            let payload = jwt.verify(accessToken, jwtKey.secret);   //token decode
            res.locals.mbrNo = payload.mbrNo;
            res.locals.mbrEmail = payload.mbrEmail;
            res.locals.mbrNknm = payload.mbrNknm;
            next();
        } catch(e){
            return res.status(401).send();
        }
    } else {
        res.locals.mbrNo = '';
        res.locals.mbrEmail = '';
        res.locals.mbrNknm = '';
        next();
    } 
}