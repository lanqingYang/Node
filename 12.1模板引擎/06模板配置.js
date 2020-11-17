//导入模板引擎
const template = require("art-template");
const path = require("path");
const dateFormat = require("dateformat");

//设置模板根目录
template.defaults.root = path.join(__dirname, "views");
//设置默认模板后缀
template.defaults.extname = ".art";

//导入模板变量
//template.defaults.imports.变量名=变量值 （变量值可以是其他第三方模块提供的方法）
template.defaults.imports.dateFormat = dateFormat;

const html = template("06", {
  time: new Date(),
});
console.log(html);
