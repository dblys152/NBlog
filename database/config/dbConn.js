const mysql = require('mysql');

const db_info = {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'dudtjr',
    database: 'n_blog',
    connectionLimit: 30
}

let pool = mysql.createPool(db_info);

function getMysqlConn(callback) {
    pool.getConnection(function(err, conn) {
        if(!err) {
            callback(conn);
        }
    });
}

module.exports = getMysqlConn;
