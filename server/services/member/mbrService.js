const mbrDao = require('../../daos/member/mbrDao');
const blogDao = require('../../daos/blog/blogDao');
const postDao = require('../../daos/blog/postDao');

const mbrModel = require('../../models/member/mbrModel');
const blogModel = require('../../models/blog/blogModel');
const postModel = require('../../models/blog/postModel');

exports.insertMbr = async (mbrEmail, mbrPw, mbrNknm, smbrUid) => {
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
    try {
        let mbrNo = await mbrDao.selectNewMbrNo(smbrUid);       //회원번호 생성
        if(mbrNo) {
            mbrForm.mbrNo = mbrNo;
            let conn = await mbrDao.insertMbr(mbrForm);     //회원등록   
            
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

                conn = await blogDao.insertBlogMenu(blogMenuForm);  //기본 블로그 메뉴 생성(블로그, 프롤로그, 방명록)
            }

            let blogInfoForm = blogModel.newBlogInfoForm();
            blogInfoForm.intgMbrNo = mbrNo;
            blogInfoForm.blgMnuNo = setBlogMenuJson[0].blgMnuNo;
            blogInfoForm.mbrNknm = mbrNknm;
            conn = await blogDao.insertBlogInfo(blogInfoForm);  //기본 블로그 정보 생성

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
            conn = await postDao.insertPostClass(postClForm);

            conn.commit();
            conn.release();
        } else {
            throw "MbrNo not found!";
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
};

exports.selectMbrEmailCnt = async (mbrEmail) => {
    return await mbrDao.selectMbrEmailCnt(mbrEmail);
}

exports.selectMbrInfo = async (mbrForm) => {
    return await mbrDao.selectMbrInfo(mbrForm);
};

exports.selectLoginMbr = async (mbrEmail, mbrPw, smbrUid) => {
    let mbrForm = {};
    mbrForm.mbrEmail = mbrEmail;
    mbrForm.mbrPw = mbrPw;
    mbrForm.smbrUid = smbrUid;
    return await mbrDao.selectMbrInfo(mbrForm);
};

exports.updateMbrLoginDtt = async (mbrNo, smbrNo) => {
    await mbrDao.updateMbrLoginDtt(mbrNo, smbrNo);
};

exports.updateMbrPwErr = async (mbrEmail) => {
    await mbrDao.updateMbrPwErr(mbrEmail);
};