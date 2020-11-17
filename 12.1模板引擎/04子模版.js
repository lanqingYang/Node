//导入模板引擎
const template = require("art-template");
const path = require("path");

const views = path.join(__dirname, "views", "04.art");

//template方法用来拼接字符串的
//template('模板路径'，数据);
//1.绝对路径，  __dirname当前文件所在的路径
//2.第二个参数，要在模板中显式的数据 对象类型

//template方法返回一个拼接好的字符串
const html = template(views, {
  msg: "我是首页",
});
console.log(html);
