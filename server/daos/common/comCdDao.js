const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/comCd.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectComCdList = async (conn, comCdJson) => {
    let sql = mybatisMapper.getStatement('comCd', 'selectComCdList', comCdJson, sqlFormat);
    console.log(sql);
    let [comCdList] = await conn.query(sql);
    console.log(comCdList);
    return comCdList;
};