const express = require('express');
const router = express.Router();
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/post.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식
const dbConfig = require('../../database/config/dbConn.js');
const comCdModule = require('../common/comCd.js');
const ctgModule = require('../common/category.js');

router.get('/:mbrNo/:postNo', function(req, res) {
    let mbrNo = req.params.mbrNo;
    let postNo = req.params.postNo;
    let comCdJson = {"upComCd" : comCdModule.comCdData().pstDispCd};    //게시글전시코드
    comCdModule.selectComCdList(comCdJson, function(result) {
        let comCdStr = JSON.stringify(result);
        ctgModule.selectCtgList(null, function(result) {
            res.send('This is postMng! ' + mbrNo + '/' + postNo + ' : ' + comCdStr + JSON.stringify(result));
        });
    });
});

module.exports = router;
