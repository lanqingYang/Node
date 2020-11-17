//改进8中的回调地狱
const fs = require("fs");

function p(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, result) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

p("./1.txt")
  .then((r1) => {
    console.log(r1);
    return p("./2.txt");
  })
  .then((r2) => {
    console.log(r2);
    return p("./3.txt");
  })
  .then((r3) => {
    console.log(r3);
  });
