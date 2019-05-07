//引入mysql模块
var mysql = require('mysql');
//创建连接池
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    //库名
    database: 'excellentcourse'
});

let db = (sql, callback) => {
    //连接
    pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(sql, function (error, results, fields) {
            callback(results);
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

//封装起来
let db2 = (sql, callback) => {
    //创建连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        //库名
        database: 'excellentcourse'
    });
    //连接
    connection.connect();
    //执行sql语句，是异步操作
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
    //关闭连接
    connection.end();
}
module.exports = db;