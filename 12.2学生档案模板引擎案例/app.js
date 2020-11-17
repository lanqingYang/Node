//引入http模块
const http = require("http");

//引入模板引擎
const template = require("art-template");
//引入路径模块
const path = require("path");
//引入静态资源访问模块 返回一个方法
const serveStatic = require("serve-static");
//引入日期格式转换模块
const dateformat = require("dateformat");
//导入router
const router = require("./route/index");

//实现静态资源访问服务 也是返回方法，调用方法才能来启用它
const serve = serveStatic(path.join(__dirname, "public"));

//配置模板的根目录
template.defaults.root = path.join(__dirname, "views");
//配置模板的后缀
template.defaults.extname = ".art";
//向模板引入处理日期格式的方法
template.defaults.imports.dateformat = dateformat;

//数据库连接
require("./model/connect");

//创建网站服务器
const app = http.createServer();

//为服务器添加请求事件
app.on("request", (req, res) => {
  //router还有第三个参数(必填参数)，回调函数
  router(req, res, () => {});
  //同router
  serve(req, res, () => {});
});

//创建服务器端口
app.listen(3000);
console.log("服务器启动成功");
