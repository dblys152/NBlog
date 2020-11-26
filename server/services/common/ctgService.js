const ctgDao = require('../../daos/common/ctgDao');

exports.selectCtgList = async (ctgJson) => {
    return await ctgDao.selectCtgList(ctgJson);
};
