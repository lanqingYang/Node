//引入express矿建
const express = require("express");

const home = require("./route/home");
const admin = require("./route/admin");
//创建网站服务器
const app = express();

//创建路由对象
const touter = express.Router();
//为路由对象匹配请求路径
app.use("/admin", admin);
app.use("/home", home);

app.listen(3000);
console.log("服务器启动了");
