//引入express矿建
const express = require("express");
//引入body-parser模块来获取
const bodyParser = require("body-parser");

//创建网站服务器
const app = express();

// (内部实现机制: 对所有请求调用bodyParser.urlencoded({ extended:false })对请求进行处理,
// ps:  extended:false false,表示利用queryString系统模块对参数的值进行处理;
//  true用另一个第三方模块QS来处理参数(更强大,但目前可以不用)
//   ..1检测当前请求中是否包含了请求参数,包含则接收,并将请求参数转换成对象类型
//   ..2为req这个参数添加一个body属性,将请求参数的值赋给了req.body属性
//   ..3在方法的内部调用next()方法将请求控制权交给下一个中间件)

app.use(bodyParser.urlencoded({ extended: false }));

//利用表单来发送post请求
app.post("/add", (req, res) => {
  res.send(req.body);
});

app.listen(3000);
console.log("服务器启动了");
