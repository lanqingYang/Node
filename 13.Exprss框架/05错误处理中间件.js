//引入express框架
const express = require("express");
const fs = require("fs");

//创建服务器网站 (包含了createServe())
const app = express();

app.get("/index", (req, res) => {
  //手动创建错误,同步错误可以被主动错误处理中间件主动捕获
  throw new Error("程序发生了未知错误");
  res.send("程序正常执行");
});

//错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

//，异步代码处理错误，调用next时传入错误信息，异步代码
app.get("/read", (req, res, next) => {
  fs.readFile("package-lock.json", "utf-8", (err, result) => {
    if (err != null) {
      //next不传参数，代表转交控制权，传参数代表要触发错误处理中间件
      next(err);
    } else {
      res.send(result);
    }
  });
});
//监听端口
app.listen(3000);
console.log("服务器启动");
