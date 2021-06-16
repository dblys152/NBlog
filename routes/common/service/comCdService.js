const dbConfig = require('../../../config/dbConn.js');

const comCdDao = require('../dao/comCdDao');

exports.selectComCdList = async (res, comCdJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let comCdList = await comCdDao.selectComCdList(conn, comCdJson);
        conn.release();
        return comCdList;
    } catch(err) {
        conn.release();
        console.log(err);
        res.status(500).send();
    }
};