//引入express矿建
const express = require("express");
//引入body-parser模块来获取
const bodyParser = require("body-parser");

//创建网站服务器
const app = express();

// 这里 :id 是一个占位符,表示当前路由要接收一个id作为参数
app.get("/index/:id/:name/:age", (req, res) => {
  res.send(req.params);
});
//如果不传参数的话 是匹配不到这个路由的 ,有多少个参数就要写多少

app.get("/index", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
app.listen(3000);
console.log("服务器启动了");
