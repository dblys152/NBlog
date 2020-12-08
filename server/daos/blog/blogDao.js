const dbConfig = require('../../config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/config/mapper/blog.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertBlogMenu = async (blogMenuForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('blog', 'insertBlogMenu', blogMenuForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
        return conn;
    } catch(err) {
        conn.rollback();
        console.log(err);
        throw err;
    }
};

exports.insertBlogInfo = async (blogInfoForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('blog', 'insertBlogInfo', blogInfoForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
        return conn;
    } catch(err) {
        conn.rollback();
        console.log(err);
        throw err;
    }
};

exports.selectBlogInfo = async (blogInfoForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('blog', 'selectBlogInfo', blogInfoForm, sqlFormat);
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

exports.selectBlogMenuList = async (blogMenuForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let sql = mybatisMapper.getStatement('blog', 'selectBlogMenuList', blogMenuForm, sqlFormat);
        console.log(sql);
        let [blogMenuList] = await conn.query(sql);
        conn.release();
        console.log(blogMenuList);
        return blogMenuList;
    } catch(err) {
        console.log(err);
        throw err;
    }
};