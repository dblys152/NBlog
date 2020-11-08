const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
    fetch('http://' + req.headers.host + '/member/mbrInfo')
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            console.log(data);
        });
    res.render('front/home.ejs', { title: 'Express' });
});

module.exports = router;