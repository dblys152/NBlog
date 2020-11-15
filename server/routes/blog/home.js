const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const layoutJson = {'layout': 'common/layout'};
const mbrForm = require('../../models/mbrForm.js').mbrForm;

/* GET home page. */
router.get('/', function(req, res, next) {
    mbrForm.mbrNo = "M000000002";
    console.log(mbrForm);
    fetch('http://' + req.headers.host + '/member/mbrInfo', {
            method: 'post'
          , body : JSON.stringify(mbrForm)
          , headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())  
        .then(result => {
            if (result.error) throw result.error
            console.log(result[0]);
            res.render('front/blog/home.ejs', {...result[0], ...layoutJson});
        });
});

module.exports = router;