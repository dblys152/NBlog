const mysql = require('mysql2/promise');

const db_info = {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'dudtjr',
    database: 'n_blog',
    multipleStatements: true,
    connectionLimit: 10
};

const pool = mysql.createPool(db_info);

const getMysqlConn = async () => { 
    try {
        const conn = await pool.getConnection(async conn => conn);
        return conn;
    } catch(err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    getMysqlConn
};
