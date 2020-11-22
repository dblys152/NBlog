const comCdDao = require('../../daos/common/comCdDao');

const selectComCdList = async (comCdJson) => {
    return await comCdDao.selectComCdList(comCdJson);
}
exports.selectComCdList = selectComCdList;