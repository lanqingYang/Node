const express = require("express");
const path = require("path");
const app = express();

const realpath = path.join(__dirname, "public");

//实现静态资源访问功能
app.use(express.static(realpath));
app.listen(3000);
console.log("服务器启动了");
