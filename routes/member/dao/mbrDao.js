const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectNewMbrNo = async (conn, smbrUid) => {
    let sql = '';
    if(smbrUid == null) {
        sql = mybatisMapper.getStatement('mbr', 'selectNewMbrNo', null, sqlFormat);
    } else {
        sql = mybatisMapper.getStatement('mbr', 'selectNewSnsMbrNo', null, sqlFormat);
    }
    try {
        let [row] = await conn.query(sql);
        console.log(sql);
        console.log(row[0].mbrNo);
        return row[0].mbrNo;
    } catch(err) {
        console.log(sql);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.insertMbr = async (conn, mbrForm) => {
    let sql = '';
    if(mbrForm.smbrUid == null) {
        sql = mybatisMapper.getStatement('mbr', 'insertMbr', mbrForm, sqlFormat);
    } else {
        sql = mybatisMapper.getStatement('mbr', 'insertSnsMbr', mbrForm, sqlFormat);
    }
    try {
        await conn.execute(sql);
        console.log(sql);
    } catch(err) {
        console.log(sql);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.selectMbrEmailCnt = async (conn, mbrEmail) => {
    let sql = mybatisMapper.getStatement('mbr', 'selectMbrEmailCnt', {"mbrEmail": mbrEmail}, sqlFormat);
    try {
        let [row] = await conn.query(sql);
        console.log(sql);
        console.log(row[0].cnt);
        return row[0].cnt;
    } catch(err) {
        console.log(sql);
        throw {"status": 500, "message": "SQL execution error"};
    }
}

exports.selectMbrInfo = async (conn, mbrForm) => {
    let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrForm, sqlFormat);
    try {
        let [mbrInfo] = await conn.query(sql);
        console.log(sql);
        console.log(mbrInfo);
        return mbrInfo[0];
    } catch(err) {
        console.log(sql);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.updateMbrLoginDtt = async (conn, mbrNo, smbrNo) => {
    let sql = '';
    if(smbrNo == null) {
        sql = mybatisMapper.getStatement('mbr', 'updateMbrLoginDtt', {mbrNo: mbrNo}, sqlFormat);
    } else {
        sql = mybatisMapper.getStatement('mbr', 'updateSnsMbrLoginDtt', {smbrNo: smbrNo}, sqlFormat);
    }
    try {
        await conn.execute(sql);
        console.log(sql);
    } catch(err) {
        console.log(sql);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.updateMbrPwErr = async (conn, mbrEmail) => {
    let sql = mybatisMapper.getStatement('mbr', 'updateMbrPwErr', {mbrEmail: mbrEmail}, sqlFormat);
    try {
        await conn.execute(sql);
        console.log(sql);
    } catch(err) {
        console.log(sql);
        throw {"status": 500, "message": "SQL execution error"};
    }
};