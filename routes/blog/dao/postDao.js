const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['mapper/post.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

exports.insertPostClass = async (conn, postClForm) => {
    try {
        let sql = mybatisMapper.getStatement('post', 'insertPostClass', postClForm, sqlFormat);
        console.log(sql);
        await conn.execute(sql);
    } catch(err) {
        console.log(err);
        throw {"status": 500, "message": "SQL execution error"};
    }
};
