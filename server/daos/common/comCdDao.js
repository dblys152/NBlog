const dbConfig = require('../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/database/mapper/comCd.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

const selectComCdList = async (comCdJson) => {
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
}
exports.selectComCdList = selectComCdList;