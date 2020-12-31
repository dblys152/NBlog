const dbConfig = require('../../config/dbConn');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectNewMbrNo = async (smbrUid) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = '';
        if(smbrUid == null) {
            sql = mybatisMapper.getStatement('mbr', 'selectNewMbrNo', null, sqlFormat);
        } else {
            sql = mybatisMapper.getStatement('mbr', 'selectNewSnsMbrNo', null, sqlFormat);
        }
        console.log(sql);
        let [row] = await conn.query(sql);
        conn.release();
        console.log(row[0].mbrNo);
        return row[0].mbrNo;
    } catch(err) {
        console.log(err);
        throw err;
    }
};

exports.insertMbr = async (mbrForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = '';
        if(mbrForm.smbrUid == null) {
            sql = mybatisMapper.getStatement('mbr', 'insertMbr', mbrForm, sqlFormat);
        } else {
            sql = mybatisMapper.getStatement('mbr', 'insertSnsMbr', mbrForm, sqlFormat);
        }
        console.log(sql);
        await conn.execute(sql);
        return conn;
    } catch(err) {
        conn.rollback();
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

exports.updateMbrLoginDtt = async (mbrNo, smbrNo) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = '';
        if(smbrNo == null) {
            sql = mybatisMapper.getStatement('mbr', 'updateMbrLoginDtt', {mbrNo: mbrNo}, sqlFormat);
        } else {
            sql = mybatisMapper.getStatement('mbr', 'updateSnsMbrLoginDtt', {smbrNo: smbrNo}, sqlFormat);
        }
        console.log(sql);
        await conn.execute(sql);
        conn.commit();
    } catch(err) {
        conn.rollback();
        console.log(err);
        throw err;
    }
};

exports.updateMbrPwErr = async (mbrEmail) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('mbr', 'updateMbrPwErr', {mbrEmail: mbrEmail}, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
        conn.commit();
    } catch(err) {
        conn.rollback();
        console.log(err);
        throw err;
    }
};