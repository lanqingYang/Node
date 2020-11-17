function getDate(callback) {
  callback("123");
}
getDate(function (n) {
  console.log("callback函数被调用了");
  console.log(n);
});

//callback对应的函数就是回调函数
//callback=>function (n) {
//   console.log("callback函数被调用了");
//   console.log(n);
// }
