const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/mapper/blog.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertBlogMenu = async (conn, blogMenuForm) => {
    let sql = mybatisMapper.getStatement('blog', 'insertBlogMenu', blogMenuForm, sqlFormat);
    console.log(sql);
    await conn.execute(sql);
};

exports.insertBlogInfo = async (conn, blogInfoForm) => {
    let sql = mybatisMapper.getStatement('blog', 'insertBlogInfo', blogInfoForm, sqlFormat);
    console.log(sql);
    await conn.execute(sql);
};

exports.selectBlogInfo = async (conn, blogInfoForm) => {
    let sql = mybatisMapper.getStatement('blog', 'selectBlogInfo', blogInfoForm, sqlFormat);
    console.log(sql);
    let [blogInfo] = await conn.query(sql);
    console.log(blogInfo);
    return blogInfo[0];
};

exports.selectBlogMenuList = async (conn, blogMenuForm) => {
    let sql = mybatisMapper.getStatement('blog', 'selectBlogMenuList', blogMenuForm, sqlFormat);
    console.log(sql);
    let [blogMenuList] = await conn.query(sql);
    console.log(blogMenuList);
    return blogMenuList;
};