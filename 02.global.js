//验证console.log是global对象

// global.console.log("我是golobal对象下面的console.log方法输出的内容");

// global.setTimeout(function () {
//   console.log("123");
// }, 2000);

console.log("我是golobal对象下面的console.log方法输出的内容");

setTimeout(function () {
  console.log("123");
}, 2000);
