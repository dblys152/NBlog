const dbConfig = require('../../config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectCtgList = async (ctgJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('ctg', 'selectCtgList', ctgJson, sqlFormat);
        console.log(sql);
        let [ctgList] = await conn.query(sql);
        conn.release();
        console.log(ctgList);
        return ctgList;
    } catch(err) {
        console.log(err);
        throw err;
    }
};