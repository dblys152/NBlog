const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/mapper/ctg.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectCtgList = async (conn, ctgJson) => {
    let sql = mybatisMapper.getStatement('ctg', 'selectCtgList', ctgJson, sqlFormat);
    console.log(sql);
    let [ctgList] = await conn.query(sql);
    console.log(ctgList);
    return ctgList;
};