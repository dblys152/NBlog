const dbConfig = require('../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/database/mapper/blog.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

const selectBlogInfo = async (blogJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) return false;
    try {
        let sql = mybatisMapper.getStatement('blog', 'selectBlogInfo', blogJson, sqlFormat);
        let [blogInfo] = await conn.query(sql);
        conn.release();
        console.log(sql);
        console.log(blogInfo);
        return blogInfo[0];
    } catch(err) {
        console.log(err);
        return false;
    }
}
exports.selectBlogInfo = selectBlogInfo;