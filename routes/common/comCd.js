const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['public/mapper/comCd.xml']); //매퍼로드
const db_config = require('./../../config/database.js');
let conn = db_config.mysqlInit();
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

let comCdList = new Array();

module.exports = {
    comCdList: function() {
        function selectComCdList(callback) {
            let sql = mybatisMapper.getStatement('comCd', 'selectComCdList', sqlFormat);
            console.log(sql);
            conn.query(sql, function(err, result) {
                if(err){
                    callback(err, null);
                } else{
                    callback(null, result);
                }
            });
        }

        selectComCdList(function(err, data) {
            if (err) {
                return err;       
            } else {           
                console.log(data); 
                comCdList = data;
                return comCdList;
            }    
        });
        return comCdList;
    }
};