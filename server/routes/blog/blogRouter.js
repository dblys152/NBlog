const express = require('express');
const router = express.Router();
const layoutJson = {'layout': 'common/layout'};
const blogLayoutJson = {'layout': 'common/blogLayout'};
const fetch = require('node-fetch');

const mbrService = require('../../services/member/mbrService');
const blogService = require('../../services/blog/blogService');

let mbrModel = require('../../models/member/mbrModel.js');
let blogModel = require('../../models/blog/blogModel.js');

router.get('/', function(req, res, next) {
    let mbrForm = mbrModel.newMbrForm();
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
            res.render('front/blog/blogHome.ejs', {...result[0], ...layoutJson});
        });
});

router.get('/:mbrEmail', function(req, res) {
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrEmail = req.params.mbrEmail;
    console.log(mbrForm);
    mbrService.selectMbrInfo(mbrForm, function(result) {
        let mbrInfo = result[0];
        console.log(mbrInfo);
        let blogInfoForm = blogModel.newBlogInfoForm();
        blogInfoForm.intgMbrNo = mbrInfo.MBR_NO;
        blogInfoForm.blgMnuNo = 'BM01';
        blogService.selectBlogInfo(blogInfoForm, function(result) {
            let blogInfo = result[0];
            console.log(blogInfo);
            res.render('front/blog/blogView', {...{'mbrInfo': mbrInfo}, ...{'blogInfo': blogInfo}, ...blogLayoutJson});
        });      
    });
});

module.exports = router;
