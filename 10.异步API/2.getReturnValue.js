function getMsg() {
  setTimeout(() => {
    return {
      msg: "hello node.js",
    };
  }, 2000);

  //不写return 默认返回就是undefined
  //而setTimeout是异步的api 不会影响下一步的执行，当2s之后， return undefined早就被执行了
}

const msg = getMsg();

console.log(msg); //=>undefined

//------------>
//利用回调函数拿到数据

function getMsg2(callback) {
  setTimeout(() => {
    callback({
      msg: "hello node.js",
    });
  }, 2000);
}

getMsg2(function (data) {
  console.log(data);
});
