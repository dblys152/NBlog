const express = require('express');
const router = express.Router();
const dbConfig = require('../../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/blog.xml']); //매퍼로드
const fetch = require('node-fetch');
const layoutJson = {'layout': 'common/blogLayout'};
const mbrForm = require('../../models/mbrForm.js').mbrForm;

router.get('/:mbrEmail', function(req, res) {
    mbrForm.mbrEmail = req.params.mbrEmail;
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
            res.render('front/blog/blogView.ejs', {...result[0], ...layoutJson});
        });
});

module.exports = router;
