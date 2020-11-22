const mbrDao = require('../../daos/member/mbrDao');

const selectMbrInfo = async (mbrJson) => {
    return await mbrDao.selectMbrInfo(mbrJson);
}
exports.selectMbrInfo = selectMbrInfo;

