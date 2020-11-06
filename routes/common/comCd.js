const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['public/mapper/comCd.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식
const dbConfig = require('./../../config/database.js');

module.exports = {
    comCdList: function(callback) {
        let sql = mybatisMapper.getStatement('comCd', 'selectComCdList', sqlFormat);
        console.log(sql);
        dbConfig((conn) => {
            conn.query(sql, function(err, result) {
                if(err){
                    callback(err, null);
                } else{
                    callback(null, result);
                }
            });
            conn.release();
        });
    }
};