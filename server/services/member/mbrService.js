const mbrDao = require('../../daos/member/mbrDao');

const mbrModel = require('../../models/member/mbrModel');

exports.insertMbr = async (mbrEmail, mbrPw, mbrNknm) => {
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrEmail = mbrEmail;
    mbrForm.mbrPw = mbrPw;
    mbrForm.mbrNknm = mbrNknm;
    return await mbrDao.insertMbr(mbrForm);
};

exports.selectMbrEmailCnt = async (mbrEmail) => {
    return await mbrDao.selectMbrEmailCnt(mbrEmail);
}

exports.selectMbrInfo = async (mbrForm) => {
    return await mbrDao.selectMbrInfo(mbrForm);
};

exports.selectLoginMbr = async (mbrEmail, mbrPw) => {
    let mbrForm = mbrModel.newMbrForm();
    mbrForm.mbrEmail = mbrEmail;
    mbrForm.mbrPw = mbrPw;
    return await mbrDao.selectMbrInfo(mbrForm);
};