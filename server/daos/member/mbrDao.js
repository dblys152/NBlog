const dbConfig = require('../../database/config/dbConn');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/database/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectMbrInfo = async (mbrJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) return false;
    try {
        let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrJson, sqlFormat);
        let [mbrInfo] = await conn.query(sql);
        conn.release();
        console.log(sql);
        console.log(mbrInfo);
        return mbrInfo[0];
    } catch(err) {
        console.log(err);
        return false;
    }
};

exports.selectLoginMbr = async (mbrJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) return false;
    try {
        let sql = mybatisMapper.getStatement('mbr', 'selectLoginMbr', mbrJson, sqlFormat);
        let [mbrInfo] = await conn.query(sql);
        conn.release();
        console.log(sql);
        console.log(mbrInfo);
        return mbrInfo[0];
    } catch(err) {
        console.log(err);
        return false;
    }
}