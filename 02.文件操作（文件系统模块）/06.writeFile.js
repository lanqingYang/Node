//2.写入文件
const fs = require("fs");
//fs.writeFile('文件路径/名称'，‘数据’，callback)
fs.writeFile("./demo.txt", "即将要写入的内容", (err, doc) => {
  console.log(err);
  console.log(doc);
});

