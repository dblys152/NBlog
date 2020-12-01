const mbrDao = require('../../daos/member/mbrDao');

const mbrModel = require('../../models/member/mbrModel');

exports.selectMbrInfo = async (mbrJson) => {
    return await mbrDao.selectMbrInfo(mbrJson);
};

exports.selectLoginMbr = async (mbrEmail, mbrPw) => {
    let mbrJson = mbrModel.newMbrForm();
    mbrJson.mbrEmail = mbrEmail;
    mbrJson.mbrPw = mbrPw;
    return await mbrDao.selectLoginMbr(mbrJson);
};