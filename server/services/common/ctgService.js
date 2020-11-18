const dbConfig = require('../../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

const selectCtgList = async (ctgJson) => {
    try {
        const conn = await dbConfig.getMysqlConn();
        try {
            let sql = mybatisMapper.getStatement('ctg', 'selectCtgList', ctgJson, sqlFormat);
            console.log(sql);
            let [ctgList] = await conn.query(sql);
            console.log(ctgList);
            conn.release();
            return ctgList;
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
    selectCtgList
};