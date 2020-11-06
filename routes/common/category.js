const express = require('express');
const router = express.Router();

const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['public/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식
const dbConfig = require('./../../config/database.js');

router.post('/list', function(req, res, next) {
    let sql = mybatisMapper.getStatement('ctg', 'selectCtgList', sqlFormat);
    console.log(sql);
    dbConfig((conn) => {
        conn.query(sql, function(err, result) {
            if(err){
                res.send(err);
            } else{
                res.send(result);
            }
        });
        conn.release();
    });
});

module.exports = router;