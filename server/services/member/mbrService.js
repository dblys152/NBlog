const dbConfig = require('../../../database/config/dbConn');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/mbr.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

const selectMbrInfo = async (mbrJson) => {
    try {
        const conn = await dbConfig.getMysqlConn();
        try {
            let sql = mybatisMapper.getStatement('mbr', 'selectMbrInfo', mbrJson, sqlFormat);
            console.log(sql);
            let [mbrInfo] = await conn.query(sql);
            console.log(mbrInfo);
            conn.release();
            return mbrInfo[0];
        } catch(err) {
            conn.release();
            console.log('Qeury error!');
            return false;
        }
    } catch(err) {
        console.log('DB error!');
        return false;
    }
}

module.exports = {
    selectMbrInfo
}