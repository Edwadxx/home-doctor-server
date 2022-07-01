const mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zxc25341083',
  database : 'homedoctor'
});

// 建立链接
connection.connect()

module.exports.connection = connection