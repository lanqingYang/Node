//引入express框架
const express = require("express");

//创建服务器网站 (包含了createServe())
const app = express();

//网站维护公告
// app.use((req, res, next) => {
//   res.send("网站正在维护中....");
// });

app.use("/admin", (req, res, next) => {
  //   let isLogin = false;
  let isLogin = true;

  if (isLogin) {
    next();
  } else {
    res.send("您还没有登陆，不能访问/admin页面");
  }
});

app.get("/admin", (req, res) => {
  res.send("已经登陆，访问到/admin页面");
});

app.use((req, res, next) => {
  //响应状态码以及提示信息，可链式调用
  res.status(404).send("当前访问的页面不存在");
});

//监听端口
app.listen(3000);
console.log("服务器启动");
