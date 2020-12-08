const dbConfig = require('../../config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/post.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertPostClass = async (postClForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('post', 'insertPostClass', postClForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
        return conn;
    } catch(err) {
        conn.rollback();
        console.log(err);
        throw err;
    }
};
