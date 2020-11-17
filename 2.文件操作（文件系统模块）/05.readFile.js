//1.通过模块的名字fs对模块进行引用
const fs = require("fs");

//通过模块内部的readFile读取文件内容
//  fs.readFile("文件路径"[, 编码],回调)
fs.readFile("../01.helloworld.js", "utf-8", (err, doc) => {
  //文件读取错， err是一个对象 包含错误信心
  //正确 err是 null
  //doc是文件读取结果

  console.log(err);
  console.log(doc);
});

//注意：读取文件是硬盘的操作，我们需要利用回调函数来对获取的东西进行操作
