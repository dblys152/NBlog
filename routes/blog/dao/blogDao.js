const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['mapper/blog.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertBlogMenu = async (conn, blogMenuForm) => {
    try {
        let sql = mybatisMapper.getStatement('blog', 'insertBlogMenu', blogMenuForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.insertBlogInfo = async (conn, blogInfoForm) => {
    try {
        let sql = mybatisMapper.getStatement('blog', 'insertBlogInfo', blogInfoForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.selectBlogInfo = async (conn, blogInfoForm) => {
    try {
        let sql = mybatisMapper.getStatement('blog', 'selectBlogInfo', blogInfoForm, sqlFormat);
        console.log(sql);
        let [blogInfo] = await conn.query(sql);
        console.log(blogInfo);
        return blogInfo[0];
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};

exports.selectBlogMenuList = async (conn, blogMenuForm) => {
    try {
        let sql = mybatisMapper.getStatement('blog', 'selectBlogMenuList', blogMenuForm, sqlFormat);
        console.log(sql);
        let [blogMenuList] = await conn.query(sql);
        console.log(blogMenuList);
        return blogMenuList;
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};