const mysql = require('mysql2/promise');

const db_info = {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'dudtjr',
    database: 'n_blog',
    connectionLimit: 10
};

const pool = mysql.createPool(db_info);

const getMysqlConn = async () => { 
    return await pool.getConnection(async conn => conn);
};

module.exports = {
    getMysqlConn
};
