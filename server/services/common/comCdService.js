const comCdDao = require('../../daos/common/comCdDao');

exports.selectComCdList = async (comCdJson) => {
    return await comCdDao.selectComCdList(comCdJson);
};