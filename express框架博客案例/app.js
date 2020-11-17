//引框架
const express = require("express");
//引path模块
const path = require("path");
//引入body-parser来处理post参数
const bodyParser = require("body-parser");
//引入express-session模块
const session = require("express-session");
//导入art-template模板引擎，在下载express-art-template时，art-template也已经下载好了
const template = require("art-template");
//引入dateformat 日期格式转换模块 返回的是一个方法,为了向模板中导入外部变量，从而引入了art-template模板
const dateformat = require("dateformat");
//引入morgan第三方模块 返回一个方法
const morgan=require('morgan');
//导入config模块
const config=require('config');


//创服务器
const app = express();

//数据库连接
require("./model/connect");

//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session , 1.value被加密处理，2.保存一个未初始化的cookie：只要客户端去访问服务器端，不管登陆未登陆都存一个cookie，但在未登陆状态下，是不希望存储cookie的，所以设置未false
app.use(
  session({
    secret: "secret key",
    saveUninitialized: false,
    cookie: {
      //24小时，以毫秒为单位
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//告诉express框架模板所在位置
app.set("views", path.join(__dirname, "views"));
//告诉express框架模板默认后缀
app.set("view engine", "art");
//当渲染后缀为art的模板时，使用的模板引擎是什么
app.engine("art", require("express-art-template"));
//向模板内部导入dateformat变量
template.defaults.imports.dateformat = dateformat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")));





//获取系统环境变量，返回值是对象
//console.log(process.env);
if (process.env.NODE_ENV == "development") {
  console.log("当前是开发环境");
  //在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
  app.use(morgan('dev'))
} else {
  console.log("当前是生产环境");
}

//引入路由对象
const admin = require("./route/admin");
const home = require("./route/home");
const { date } = require("joi");

//拦截请求，判断访问的是否是登陆页面
app.use("/admin", require("./middleware/loginGuard"));
// //创建一级目录
app.use("/home", home);
app.use("/admin", admin);

//错误处理中间件
app.use((err, req, res, next) => {
  //将字符串对象转换为对象类型
  //JSON.parse()
  // console.log(err);
  const result = JSON.parse(err);
  let params = [];
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
      //相当于： messag='密码比对失败' 这个值
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});

//端口
app.listen(3000);
console.log("服务器开启了,请访问localhost:3000");
