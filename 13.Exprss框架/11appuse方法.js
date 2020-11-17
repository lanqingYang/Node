//引入express矿建
const express = require("express");
//引入body-parser模块来获取
const bodyParser = require("body-parser");

//创建网站服务器
const app = express();

//解释app.use()里面传递一个函数的调用

app.use(fn({ a: 2 }));
//可以传参,并且可以在返回值函数的内部运用这个参数
function fn(obj) {
  return function (req, res, next) {
    if (obj.a == 1) {
      console.log(req.method);
    } else {
      console.log(req.url);
    }
    next();
  };
}

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(3000);
console.log("服务器启动了");
