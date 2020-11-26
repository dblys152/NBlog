const jwtKey = require('./jwtKey.js');

module.exports = () => {
    const expJwt = require('express-jwt');
    return expJwt(jwtKey);
};