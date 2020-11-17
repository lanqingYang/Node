//引入express框架
const express = require("express");
const fs = require("fs");
//把读取文件的这个api改造成支持异步函数的形式
//promisify 将方法进行包装,返回promise对象，从而支持异步函数语法
const promisify = require("util").promisify;
const readFile = promisify(fs.readFile);

//创建服务器网站 (包含了createServe())
const app = express();

app.get("/index", async (req, res, next) => {
  //使用try catch 让程序不会因为文件没有被找到就终止了，（程序不会报错了）
  try {
    await readFile("./aaa.js");
  } catch (ex) {
    //catch拿到错误信息，然后next（ex），手动触发错误处理中间件
    next(ex);
  }
});

app.use((err, req, res, next) => {
  res.send(err);
});

//监听端口
app.listen(3000);
console.log("服务器启动");
