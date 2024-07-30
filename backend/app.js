const express = require("express");
const app = express();

const cors = require("cors"); //解决跨域问题
app.use(cors());

const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 处理 mutipart/form-data
app.use(multiparty());
// 处理 application/json
app.use(bodyParser.json());

const { query } = require("./src/utils/database.js");

//一个简单的测试接口
app.get("/test", (req, res) => {
  res.send("测试用的接口");
});

//一个简单的接口，查询数据库中的信息
app.get("/getUser", (req, res) => {
  let sql = "select * from user";
  query(sql).then((result) => {
    res.send(result);
  });
});

//监听node服务器的端口号
app.listen(9600, () => {
  console.log("恭喜你，服务器启动成功");
});
