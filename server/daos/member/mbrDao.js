const dbConfig = require('../../config/dbConn');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertMbr = async (mbrForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('mbr', 'insertMbr', mbrForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
        conn.release();
        return true;
    } catch(err) {
        console.log(err);
        throw err;
    }
};

exports.selectMbrEmailCnt = async (mbrEmail) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('mbr', 'selectMbrEmailCnt', {"mbrEmail": mbrEmail}, sqlFormat);
        console.log(sql);
        let [row] = await conn.query(sql);
        conn.release();
        console.log(row[0].cnt);
        return row[0].cnt;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

exports.selectMbrInfo = async (mbrForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrForm, sqlFormat);
        console.log(sql);
        let [mbrInfo] = await conn.query(sql);
        conn.release();
        console.log(mbrInfo);
        return mbrInfo[0];
    } catch(err) {
        console.log(err);
        throw err;
    }
};