const fs = require("fs");

//依次！！读取1，2，3文件
fs.readFile("./1.txt", "utf-8", (err, reslut1) => {
  console.log(reslut1);
  fs.readFile("./2.txt", "utf-8", (err, reslut2) => {
    console.log(reslut2);
    fs.readFile("./3.txt", "utf-8", (err, reslut3) => {
      console.log(reslut3);
    });
  });
});

//第一个文件在读取的时候是需要一些时间的，但是我们并不能确定是多少时间，但我们知道，如果运行回调函数，那么就说明文件已经被读取
//所以读取第二个文件的代码需要写在第一个文件读取的回调函数中
//依次嵌套，就是回调地狱
//解决方式： Promise
