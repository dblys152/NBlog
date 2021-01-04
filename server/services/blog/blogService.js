const dbConfig = require('../../config/dbConn.js');

const blogDao = require('../../daos/blog/blogDao');

exports.selectBlogInfo = async (res, blogInfoForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let blogInfo = await blogDao.selectBlogInfo(conn, blogInfoForm);
        conn.release();
        return blogInfo;
    } catch(err) {
        conn.release();
        console.log(err);
        res.status(500).send();
    }
};

exports.selectBlogMenuList = async (res, blogMenuForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let blogMenuList = await blogDao.selectBlogMenuList(conn, blogMenuForm);
        conn.release();
        return blogMenuList;
    } catch(err) {
        conn.release();
        console.log(err);
        res.status(500).send();
    }
};