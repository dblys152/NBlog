const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
    let mbrNo = "M000000002";
    
    fetch('http://' + req.headers.host + '/member/mbrInfo', {
            method: 'post'
          , body : JSON.stringify({"mbrNo":mbrNo})
          , headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(result => {
            if (result.error) throw result.error
            console.log(result[0]);
            res.render('front/home.ejs', result[0]);
        });
});

module.exports = router;