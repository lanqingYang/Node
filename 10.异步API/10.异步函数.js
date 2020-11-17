//1.在普通函数定义的前面加上async 普通函数变成异步函数
//2.异步函数默认返回值是promise对象！！
//3. 使用throw关键字进行错误的抛出

//await关键字
//1.它只能出现在异步函数中
//2.await promise 可以暂停异步函数的执行，等待promise对象返回结果后再向下执行
async function fn() {}

console.log(fn());
//相比之前的代码 省略了 return new Promise()这一步
async function fn1() {
  throw "发生了一些错误";
  return 123;
  //这里return关键字 替代了 resolve方法
  //throw 替代了 reject方法
}
//异步函数的返回值会包裹一层promise对象
// console.log(fn1());

//通过then拿到了里面的值
fn1()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//------------------->对6中 依次读取1，2，3文件
async function p1() {
  return "p1";
}

async function p2() {
  return "p2";
}

async function p3() {
  return "p3";
}

// 保证3个顺序执行
async function run() {
  let r1 = await p1(); //p1有返回结果了才会向下执行 ，并且可以拿到它的返回值了
  let r2 = await p2();
  let r3 = await p3();
  console.log(r1);
  console.log(r2);
  console.log(r3);
}

run();
