const mysql = require('mysql');
// 建立连接
const conn = mysql.createConnection({
  host     : '127.0.0.1', //数据库地址
  user     : 'root',  //账号
  password : '1234',  //密码
  database : 'bishe_demo',  //数据库
});

conn.connect();
// 抛出数据库
module.exports =conn;