const express = require("express");
const path = require("path");
const app = express();

const realpath = path.join(__dirname, "views");

//1.告诉express框架使用什么模板殷勤渲染什么后缀的模板文件
//参数1：模板后缀
//参数2：使用的模板引擎
app.engine("art", require("express-art-template"));

//2.模板存放的位置是什么
//参数1：固定，告诉模板存放的位置
//realpath里面的views代表文件夹的名字
app.set("views", realpath);

//3.模板的默认后缀
//参数1：默认模板后缀的配置项
app.set("view engine", "art");

app.get("/index", (req, res) => {
  //render方法做的事情：
  //1.拼接了模板路径
  //2.拼接了模板后缀
  //3.告诉哪一个模板和哪一个数据进行拼接
  //4.将拼接结果的响应结果给了客户端     (不需要再用res.send()再去响应)
  res.render("index", {
    msg: "message",
  });
});

app.get("/list", (req, res) => {
  res.render("list", {
    msg: "list page",
  });
});

app.listen(3000);
console.log("服务器启动了");
