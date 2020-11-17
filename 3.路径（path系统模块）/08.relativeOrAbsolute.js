//相对路径还是绝对路径

const fs = require("fs");
const path = require("path"); //引入路径处理模块
//相对路径
fs.readFile("../01.helloworld.js", "utf-8", (err, doc) => {
  console.log(err);
  console.log(doc);
});
//相对路径它相对的是否是当前文件，大多数相对的是  命令行工具的当前工作目录！
//比如：在命令行目录为 基础学习 下运行相对目录的那一块就会出错 ：
//运行之后目录为：'E:\\前端\\node学习\\01.helloworld.js'

//但是在读取或者设置文件都选择绝对路径 比较安全
//使用  __dirname(两个下划线) 获取当前文件所在的绝对路径
console.log("当前绝对路径:" + __dirname);
console.log(
  "获取文件的绝对路径:" + path.join(__dirname, "../01.helloworld.js")
);

fs.readFile(
  path.join(__dirname, "../01.helloworld.js"),
  "utf-8",
  (err, doc) => {
    console.log(err);
    console.log(doc);
  }
);

//require方法也有相对路径，它相对的就是当前文件，所以在使用require方法的时候是可以写相对路径的
//使用绝对路径的好处：当前命令行的工作目录不会影响文件的读取目录
