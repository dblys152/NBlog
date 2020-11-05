const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['public/mapper/comCd.xml']); //매퍼로드
const db_config = require('./../../config/database.js');
let conn = db_config.mysqlInit();
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

module.exports = {
    comCdList: function () {
        let sql = mybatisMapper.getStatement('comCd', 'selectComCdList', sqlFormat);
        console.log(sql);
        let comCdList = null;
        conn.query(sql, function(err, result) {
            if(err){
                return err;
            } else{
                comCdList = result;
                return comCdList;
            }
        });
        return comCdList;
    },
};