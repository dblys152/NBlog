const ctgDao = require('../../daos/common/ctgDao');

const selectCtgList = async (ctgJson) => {
    return await ctgDao.selectCtgList(ctgJson);
}
exports.selectCtgList = selectCtgList;
