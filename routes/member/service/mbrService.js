const dbConfig = require('../../../config/dbConn.js');

const mbrDao = require('../dao/mbrDao');
const blogDao = require('../../blog/dao/blogDao');
const postDao = require('../../blog/dao/postDao');

const { MbrForm } = require('../model/mbrModel');
const { BlogForm, BlogMenuForm } = require('../../blog/model/blogModel');
const { PostClForm } = require('../../blog/model/postModel');

exports.insertMbr = async (mbrEmail, mbrPw, mbrNknm, smbrUid, regNo) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        conn.beginTransaction();    //트랜잭션 시작

        let mbrForm = new MbrForm();
        if(smbrUid == null) {
            mbrForm.setMbrEmail(mbrEmail);
            mbrForm.setMbrPw(mbrPw);
            mbrForm.setMbrNknm(mbrNknm);  
        } else {
            mbrForm.setSmbrEmail(mbrEmail);
            mbrForm.setSmbrNknm(mbrNknm);
            mbrForm.setSmbrUid(smbrUid);
        }
        let mbrNo = await mbrDao.selectNewMbrNo(conn, smbrUid);       //회원번호 생성
        mbrForm.setMbrNo(mbrNo);
        await mbrDao.insertMbr(conn, mbrForm);     //회원등록   
        
        for(let i = 1; i <= 3; i++) {
            let blogMenuForm = new BlogMenuForm();
            blogMenuForm.setDefaultMnu(i);
            blogMenuForm.setIntgMbrNo(mbrNo);
            blogMenuForm.setRegNo(regNo);
            await blogDao.insertBlogMenu(conn, blogMenuForm);  //기본 블로그 메뉴 생성(블로그, 프롤로그, 방명록)

            if(i == 1) {
                let blogForm = new BlogForm();
                blogForm.setIntgMbrNo(mbrNo);
                blogForm.setBlgMnuNo(blogMenuForm.blgMnuNo);   //블로그 메뉴 번호 : 블로그
                blogForm.setBlgNm(mbrNknm + '님의 블로그');
                blogForm.setTpcCtgNo('99');   //카테고리번호: 선택안함
                await blogDao.insertBlogInfo(conn, blogForm);  //기본 블로그 정보 생성

                let postClForm = new PostClForm();
                postClForm.setIntgMbrNo(mbrNo);
                postClForm.setBlgMnuNo(blogMenuForm.blgMnuNo);  //블로그 메뉴 번호 : 블로그
                postClForm.setPstClTyCd('104101');   //게시글분류유형코드: 카테고리
                postClForm.setPstClNm('기본 카테고리');
                postClForm.setUpPstClNo(0);       //상위게시글분류번호: 최상위 0
                postClForm.setTpcCtgNo('99');     //카테고리번호: 선택안함
                postClForm.setPstCntDispYn('Y');
                postClForm.setDispYn('Y');
                postClForm.setDispTyCd('105101'); //전시유형코드: 블로그형
                postClForm.setListDispYn('Y');
                postClForm.setListDispCnt(5);
                postClForm.setSeq(1);
                postClForm.setRegNo(regNo);
                await postDao.insertPostClass(conn, postClForm);    //기본 카테고리 생성
            }
        }
        conn.commit();              //트랜잭션 종료(COMMIT)
        conn.release();             //DB연결 반환
        return mbrNo;
    } catch(err) {
        conn.rollback();            //트랜잭션 종료(ROLLBACK)
        conn.release();             //DB연결 반환
        throw err;
    }
};

exports.selectMbrEmailCnt = async (mbrEmail) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        let mbrEmailCnt = await mbrDao.selectMbrEmailCnt(conn, mbrEmail);
        conn.release();             //DB연결 반환
        return mbrEmailCnt;
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
}

exports.selectMbrInfo = async (mbrForm) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        let mbrInfo = await mbrDao.selectMbrInfo(conn, mbrForm);
        conn.release();             //DB연결 반환
        return mbrInfo;
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
};

exports.selectLoginMbr = async (mbrEmail, mbrPw, smbrUid) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        let mbrForm = new MbrForm();
        if(smbrUid == null || smbrUid == '') {
            mbrForm.setMbrEmail(mbrEmail);
            if(mbrPw != null && mbrPw != '') mbrForm.setMbrPw(mbrPw);
        } else {
            mbrForm.setSmbrUid(smbrUid);
        }
        let mbrInfo = await mbrDao.selectMbrInfo(conn, mbrForm);
        conn.release();             //DB연결 반환
        return mbrInfo;
    } catch(err) {
        conn.release();             //DB연결 반환
        throw err;
    }
};

exports.updateMbrLoginDtt = async (mbrNo, smbrNo) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        conn.beginTransaction();    //트랜잭션 시작

        await mbrDao.updateMbrLoginDtt(conn, mbrNo, smbrNo);

        conn.commit();              //트랜잭션 종료(COMMIT)
        conn.release();             //DB연결 반환
    } catch(err) {
        conn.rollback();            //트랜잭션 종료(ROLLBACK)
        conn.release();             //DB연결 반환
        throw err;
    }
};

exports.updateMbrPwErr = async (mbrEmail) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        conn.beginTransaction();    //트랜잭션 시작

        await mbrDao.updateMbrPwErr(conn, mbrEmail);

        conn.commit();              //트랜잭션 종료(COMMIT)
        conn.release();             //DB연결 반환
    } catch(err) {
        conn.rollback();            //트랜잭션 종료(ROLLBACK)
        conn.release();             //DB연결 반환
        throw err;
    }
};