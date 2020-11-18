const dbConfig = require('../../../database/config/dbConn.js');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['database/mapper/comCd.xml']); //매퍼로드
const sqlFormat = {language: 'sql', indent: '  '}; //질의문 형식

function comCdData() {
    return {
        "blgMnuTyCd"    : "101"     //블로그메뉴유형코드
      , "prlgFrmCd"     : "102"     //프롤로그형태코드
      , "ctgTyCd"       : "103"     //카테고리유형코드
      , "pstClTyCd"     : "104"     //게시글분류유형코드
      , "dispTyCd"      : "105"     //전시유형코드
      , "pstDispCd"     : "106"     //게시글전시코드
      , "idntCd"        : "107"     //식별코드
      , "fileTyCd"      : "108"     //파일유형코드
      , "mbrStatCd"     : "109"     //회원상태코드
      , "mbrSxCd"       : "110"     //회원성별코드
      , "rprtRsnCd"     : "111"     //신고사유코드
    };
}

const selectComCdList = async (comCdJson) => {
    try {
        const conn = await dbConfig.getMysqlConn();
        try {
            let sql = mybatisMapper.getStatement('comCd', 'selectComCdList', comCdJson, sqlFormat);
            console.log(sql);
            let [comCdList] = await conn.query(sql);
            console.log(comCdList);
            conn.release();
            return comCdList;
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
    comCdData
  , selectComCdList
};