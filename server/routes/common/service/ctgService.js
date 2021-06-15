const dbConfig = require('../../config/dbConn.js');

const ctgDao = require('../../daos/common/ctgDao');

exports.selectCtgList = async (res, ctgJson) => {
    const conn = await dbConfig.getMysqlConn();
    if(!conn) throw "DB connection error";
    try {
        let ctgList = await ctgDao.selectCtgList(conn, ctgJson);
        conn.release();
        return ctgList;
    } catch(err) {
        conn.release();
        console.log(err);
        res.status(500).send();
    }
};
