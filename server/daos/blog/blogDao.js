const dbConfig = require('../../config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/blog.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.selectBlogInfo = async (blogJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('blog', 'selectBlogInfo', blogJson, sqlFormat);
        console.log(sql);
        let [blogInfo] = await conn.query(sql);
        conn.release();
        console.log(blogInfo);
        return blogInfo[0];
    } catch(err) {
        console.log(err);
        throw err;
    }
};