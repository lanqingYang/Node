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

//
app.locals.users = [
  {
    name: "张胜男",
    age: 20,
  },
  {
    name: "李四",
    age: 20,
  },
];

app.get("/index", (req, res) => {
  res.render("index", {
    msg: "首页",
  });
});

app.get("/list", (req, res) => {
  res.render("list", {
    msg: "列表页",
  });
});

app.listen(3000);
console.log("服务器启动了");
