const express = require('express');
const router = express.Router();
const dbConfig = require('../../database/config/dbConn');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

/* GET users listing. */
router.post('/mbrInfo', function(req, res, next) {
    let mbrJson = req.body;
    dbConfig((conn) => {
        let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrJson, sqlFormat);
        console.log(sql);
        conn.query(sql, function(err, result) {
            if(err) throw err;
            res.json(result);
        });
        conn.release();
    });
    
});

module.exports = router;
