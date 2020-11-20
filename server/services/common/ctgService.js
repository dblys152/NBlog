const dbConfig = require('../../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

const selectCtgList = async (ctgJson) => {
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
}

module.exports = {
    selectCtgList
};