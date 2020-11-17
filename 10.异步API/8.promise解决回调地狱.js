//改进6中的回调地狱
const fs = require("fs");
//6.中有3个异步api那么就需要3个promise对象

function p1() {
  return new Promise((resolve, reject) => {
    fs.readFile("./1.txt", "utf-8", (err, result) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function p2() {
  return new Promise((resolve, reject) => {
    fs.readFile("./2.txt", "utf-8", (err, result) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function p3() {
  return new Promise((resolve, reject) => {
    fs.readFile("./3.txt", "utf-8", (err, result) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

p1()
  .then((r1) => {
    console.log(r1);
    return p2();
  })
  .then((r2) => {
    console.log(r2);
    return p3();
  })
  .then((r3) => {
    console.log(r3);
  });
