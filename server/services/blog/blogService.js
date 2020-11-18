const dbConfig = require('../../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/blog.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

const selectBlogInfo = async (blogJson) => {
    try {
        const conn = await dbConfig.getMysqlConn();
        try {
            let sql = mybatisMapper.getStatement('blog', 'selectBlogInfo', blogJson, sqlFormat);
            console.log(sql);
            let [blogInfo] = await conn.query(sql);
            console.log(blogInfo);
            conn.release();
            return blogInfo[0];
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
    selectBlogInfo
};