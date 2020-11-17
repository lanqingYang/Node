//promise用法
const fs = require("fs");

let promise = new Promise((resolve, reject) => {
  fs.readFile("./100.txt", "utf-8", (err, result) => {
    if (err != null) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

//调用resolve实际上就是在调用then方法里面的这个函数
promise
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
