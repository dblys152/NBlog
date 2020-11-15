const express = require('express');
const router = express.Router();
const dbConfig = require('../../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/post.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식
const comCdService = require('../../services/comCdService.js');
const ctgService = require('../../services/ctgService.js');

router.get('/:mbrEmail/:postNo', function(req, res) {
    let mbrEmail = req.params.mbrEmail;
    let postNo = req.params.postNo;
    let comCdJson = {"upComCd" : comCdService.comCdData().pstDispCd};
    comCdService.selectComCdList(comCdJson, function(result) {
        let comCdStr = JSON.stringify(result);
        ctgService.selectCtgList(null, function(result) {
            res.send('This is postMng! ' + mbrEmail + '/' + postNo + ' : ' + comCdStr + JSON.stringify(result));
        });
    });
});

module.exports = router;
