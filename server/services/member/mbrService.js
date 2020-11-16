const dbConfig = require('../../../database/config/dbConn');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

function selectMbrInfo(mbrJson, callback) {
    let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrJson, sqlFormat);
    console.log(sql);
    dbConfig((conn) => {
        conn.query(sql, function(err, result) {
            if(err) throw err;
            callback(result);
        });
        conn.release();
    });
}

module.exports = {
    selectMbrInfo
}