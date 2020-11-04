const mysql = require('mysql');
const db_info = {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'dudtjr',
    database: 'n_blog'
}

module.exports = {
    mysqlInit: function () {
        return mysql.createConnection(db_info);
    },
    mysqlConnect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}