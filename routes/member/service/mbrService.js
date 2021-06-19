const dbConfig = require('../../../config/dbConn.js');

const mbrDao = require('../dao/mbrDao');
const blogDao = require('../../blog/dao/blogDao');
const postDao = require('../../blog/dao/postDao');

const mbrModel = require('../model/mbrModel');
const blogModel = require('../../blog/model/blogModel');
const postModel = require('../../blog/model/postModel');

exports.insertMbr = async (mbrEmail, mbrPw, mbrNknm, smbrUid) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw {"status": 500, "message": "DB connection error"};
    try {
        conn.beginTransaction();    //트랜잭션 시작

        let mbrForm = {};
        if(smbrUid == null) {
            mbrForm = mbrModel.newMbrForm();
            mbrForm.mbrEmail = mbrEmail;
            mbrForm.mbrPw = mbrPw;
            mbrForm.mbrNknm = mbrNknm;  
        } else {
            mbrForm = mbrModel.newSnsMbrForm();
            mbrForm.smbrEmail = mbrEmail;
            mbrForm.smbrNknm = mbrNknm;
            mbrForm.smbrUid = smbrUid;
        }
        let mbrNo = await mbrDao.selectNewMbrNo(conn, smbrUid);       //회원번호 생성
        if(mbrNo) {
            mbrForm.mbrNo = mbrNo;
            await mbrDao.insertMbr(conn, mbrForm);     //회원등록   
            
            let blogMenuForm = blogModel.newBlogMenuForm();
            blogMenuForm.intgMbrNo = mbrNo;
            let setBlogMenuJson = blogModel.setBlogMenuJson;
            for(let i = 0; i < setBlogMenuJson.length; i++) {
                blogMenuForm.blgMnuNo = setBlogMenuJson[i].blgMnuNo;
                blogMenuForm.blgMnuNm = setBlogMenuJson[i].blgMnuNm;
                blogMenuForm.rprsMnuYn = setBlogMenuJson[i].rprsMnuYn;
                blogMenuForm.ncsYn = setBlogMenuJson[i].ncsYn;
                blogMenuForm.useYn = setBlogMenuJson[i].useYn;
                blogMenuForm.blgMnuTyCd = setBlogMenuJson[i].blgMnuTyCd;
                blogMenuForm.pagPstCnt = setBlogMenuJson[i].pagPstCnt;
                blogMenuForm.prlgFrmCd = setBlogMenuJson[i].prlgFrmCd;
                blogMenuForm.ntfYn = setBlogMenuJson[i].ntfYn;
                blogMenuForm.regNo = 'M000000001';

                await blogDao.insertBlogMenu(conn, blogMenuForm);  //기본 블로그 메뉴 생성(블로그, 프롤로그, 방명록)
            }

            let blogInfoForm = blogModel.newBlogInfoForm();
            blogInfoForm.intgMbrNo = mbrNo;
            blogInfoForm.blgMnuNo = setBlogMenuJson[0].blgMnuNo;
            blogInfoForm.mbrNknm = mbrNknm;
            await blogDao.insertBlogInfo(conn, blogInfoForm);  //기본 블로그 정보 생성

            let postClForm = postModel.newPostClForm();
            postClForm.intgMbrNo = mbrNo;
            postClForm.blgMnuNo = setBlogMenuJson[0].blgMnuNo;
            postClForm.pstClTyCd = '104101';   //게시글분류유형코드: 카테고리
            postClForm.pstClNm = '기본 카테고리';
            postClForm.upPstClNo = 0;       //상위게시글분류번호: 최상위 0
            postClForm.tpcCtgNo = '99';     //카테고리번호: 선택안함
            postClForm.pstCntDispYn = 'Y'
            postClForm.dispYn = 'Y'
            postClForm.dispTyCd = '105101' //전시유형코드: 블로그형
            postClForm.listDispYn = 'Y'
            postClForm.listDispCnt = 5
            postClForm.seq = 1;
            postClForm.regNo = 'M000000001';
            await postDao.insertPostClass(conn, postClForm);
            console.log('commit!!!');
            conn.commit();              //트랜잭션 종료(COMMIT)
            conn.release();             //DB연결 반환
        } else {
            throw {"status": 500, "message": "등록된 회원이 없습니다."};
        }
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
        let mbrForm = {};
        mbrForm.mbrEmail = mbrEmail;
        mbrForm.mbrPw = mbrPw;
        mbrForm.smbrUid = smbrUid;
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