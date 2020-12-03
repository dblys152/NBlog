const dbConfig = require('../../config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectCtgList = async (ctgJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) return false;
    try {
        let sql = mybatisMapper.getStatement('ctg', 'selectCtgList', ctgJson, sqlFormat);
        let [ctgList] = await conn.query(sql);
        conn.release();
        console.log(sql);
        console.log(ctgList);
        return ctgList;
    } catch(err) {
        console.log(err);
        return false;
    }
};