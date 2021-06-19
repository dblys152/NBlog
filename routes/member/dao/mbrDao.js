const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectNewMbrNo = async (conn, smbrUid) => {
    try {
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
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.insertMbr = async (conn, mbrForm) => {
    try {
        let sql = '';
        if(mbrForm.smbrUid == null) {
            sql = mybatisMapper.getStatement('mbr', 'insertMbr', mbrForm, sqlFormat);
        } else {
            sql = mybatisMapper.getStatement('mbr', 'insertSnsMbr', mbrForm, sqlFormat);
        }
        console.log(sql);
        await conn.execute(sql);
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.selectMbrEmailCnt = async (conn, mbrEmail) => {
    try {
        let sql = mybatisMapper.getStatement('mbr', 'selectMbrEmailCnt', {"mbrEmail": mbrEmail}, sqlFormat);
        console.log(sql);
        let [row] = await conn.query(sql);
        console.log(row[0].cnt);
        return row[0].cnt;
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
}

exports.selectMbrInfo = async (conn, mbrForm) => {
    try {
        let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrForm, sqlFormat);
        console.log(sql);
        let [mbrInfo] = await conn.query(sql);
        console.log(mbrInfo);
        return mbrInfo[0];
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.updateMbrLoginDtt = async (conn, mbrNo, smbrNo) => {
    try {
        let sql = '';
        if(smbrNo == null) {
            sql = mybatisMapper.getStatement('mbr', 'updateMbrLoginDtt', {mbrNo: mbrNo}, sqlFormat);
        } else {
            sql = mybatisMapper.getStatement('mbr', 'updateSnsMbrLoginDtt', {smbrNo: smbrNo}, sqlFormat);
        }
        console.log(sql);
        await conn.execute(sql);
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.updateMbrPwErr = async (conn, mbrEmail) => {
    try {
        let sql = mybatisMapper.getStatement('mbr', 'updateMbrPwErr', {mbrEmail: mbrEmail}, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};