const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['server/mapper/post.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertPostClass = async (conn, postClForm) => {
    let sql = mybatisMapper.getStatement('post', 'insertPostClass', postClForm, sqlFormat);
    console.log(sql);
    await conn.execute(sql);
};
