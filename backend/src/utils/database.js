// database.js
const mysql = require("mysql");

// 创建数据库连接池
const pool = mysql.createPool({
  connectionLimit: 10, // 限制连接数，根据实际需求调整
  host: "localhost",
  user: "root",
  port: 3306,
  password: "123456", // 这里使用自己数据库的密码
  database: "low-code", // 创建的数据库名字
});

// 获取数据库连接池中的一个连接
exports.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection error:", err);
        reject(err);
      } else {
        connection.query(sql, params, (queryErr, results) => {
          connection.release();
          if (queryErr) {
            console.error("Error querying the database:", queryErr);
            reject(queryErr);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};
