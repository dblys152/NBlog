const dbConfig = require('../../config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/comCd.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectComCdList = async (comCdJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) return false;
    try {
        let sql = mybatisMapper.getStatement('comCd', 'selectComCdList', comCdJson, sqlFormat);
        let [comCdList] = await conn.query(sql);
        conn.release();
        console.log(sql);
        console.log(comCdList);
        return comCdList;
    } catch(err) {
        console.log(err);
        return false;
    }
};