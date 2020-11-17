console.log("代码开始执行"); //同步代码

setTimeout(() => {
  //异步api
  console.log("2s");
}, 2000);

setTimeout(() => {
  //异步api
  console.log("0s");
}, 0);

console.log("代码结束执行"); //同步代码

//结果： 开始、结束、0s、2s

//分析
// 同步代码放到同步代码执行区，执行完成。
// 异步代码放到异步代码执行区：等待同步代码执行区执行完成，再执行异步代码。
// 回调函数队列：存放异步代码的回调函数

// 异步中存放了setTimeout(callback1,2000)、setTimeout(callback1,0)
// ··同步执行完成，异步执行，
// 0s后，将0s对应的哪个回调函数队列的回调函数callbakc1放入同步代码执行区去执行
// 2s后，将2s对应的哪个回调函数队列的回调函数callback2放入同步代码执行区去执行
