//引入express框架
const express = require("express");

//创建服务器网站 (包含了createServe())
const app = express();

app.get("/", (req, res) => {
  //采用send()方法取代 end()
  //1.send()方法会自动检测响应内容的类型
  //2.send()会自动设置http状态码
  //3.send()会自动设置响应的内容类型以及编码
  res.send("Hello express");
});

app.get("/list", (req, res) => {
  res.send({ name: "辉夜姬", age: 18 });
});
//对于不存在的路径界面，会以字符串的形式返回错误，而不是直接报404的页面

//监听端口
app.listen(3000);
console.log("服务器启动");
