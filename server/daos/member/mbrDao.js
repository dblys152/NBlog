const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectNewMbrNo = async (conn, smbrUid) => {
    let sql = '';
    if(smbrUid == null) {
        sql = mybatisMapper.getStatement('mbr', 'selectNewMbrNo', null, sqlFormat);
    } else {
        sql = mybatisMapper.getStatement('mbr', 'selectNewSnsMbrNo', null, sqlFormat);
    }
    console.log(sql);
    let [row] = await conn.query(sql);
    console.log(row[0].mbrNo);
    return row[0].mbrNo;
};

exports.insertMbr = async (conn, mbrForm) => {
    let sql = '';
    if(mbrForm.smbrUid == null) {
        sql = mybatisMapper.getStatement('mbr', 'insertMbr', mbrForm, sqlFormat);
    } else {
        sql = mybatisMapper.getStatement('mbr', 'insertSnsMbr', mbrForm, sqlFormat);
    }
    console.log(sql);
    await conn.execute(sql);
};

exports.selectMbrEmailCnt = async (conn, mbrEmail) => {
    let sql = mybatisMapper.getStatement('mbr', 'selectMbrEmailCnt', {"mbrEmail": mbrEmail}, sqlFormat);
    console.log(sql);
    let [row] = await conn.query(sql);
    conn.release();
    console.log(row[0].cnt);
    return row[0].cnt;
}

exports.selectMbrInfo = async (conn, mbrForm) => {
    let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrForm, sqlFormat);
    console.log(sql);
    let [mbrInfo] = await conn.query(sql);
    console.log(mbrInfo);
    return mbrInfo[0];
};

exports.updateMbrLoginDtt = async (conn, mbrNo, smbrNo) => {
    let sql = '';
    if(smbrNo == null) {
        sql = mybatisMapper.getStatement('mbr', 'updateMbrLoginDtt', {mbrNo: mbrNo}, sqlFormat);
    } else {
        sql = mybatisMapper.getStatement('mbr', 'updateSnsMbrLoginDtt', {smbrNo: smbrNo}, sqlFormat);
    }
    console.log(sql);
    await conn.execute(sql);
};

exports.updateMbrPwErr = async (conn, mbrEmail) => {
    let sql = mybatisMapper.getStatement('mbr', 'updateMbrPwErr', {mbrEmail: mbrEmail}, sqlFormat);
    console.log(sql);
    await conn.execute(sql);
};