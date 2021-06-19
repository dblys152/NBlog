const dbConfig = require('../../../config/dbConn.js');

const blogDao = require('../dao/blogDao');

exports.selectBlogInfo = async (blogInfoForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        let blogInfo = await blogDao.selectBlogInfo(conn, blogInfoForm);
        conn.release();             //DB연결 반환
        return blogInfo;
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
};

exports.selectBlogMenuList = async (blogMenuForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        let blogMenuList = await blogDao.selectBlogMenuList(conn, blogMenuForm);
        conn.release();             //DB연결 반환
        return blogMenuList;
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
};