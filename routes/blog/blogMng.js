const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const layoutJson = {'layout': 'common/blogLayout'};

router.get('/:mbrNo', function(req, res) {
    let mbrNo = req.params.mbrNo;
    fetch('http://' + req.headers.host + '/member/mbrInfo', {
            method: 'post'
          , body : JSON.stringify({"mbrNo":mbrNo})
          , headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(result => {
            if (result.error) throw result.error
            console.log(result[0]);
            res.render('front/blog/blogView.ejs', {...result[0], ...layoutJson});
        });
});

module.exports = router;
