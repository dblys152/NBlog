const dbConfig = require('../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

function selectCtgList(ctgJson, callback) {
    let sql = mybatisMapper.getStatement('ctg', 'selectCtgList', ctgJson, sqlFormat);
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
    selectCtgList
};