const greeting = (name) => `hello ${name}`;
//注意这里不是单双引号，是 点
module.exports.greeting = greeting;

//导出模块成员的第二种方法： moduel.exports对象

//exports与 module.exports区别：

//2.在写了下面的东西后，再执行require.js， 输出对象同时包含x和greeting
const x = 100;
exports.x = x;

//3.此时,module.exports与exports不指向一个对象了，执行require.js，以module.exports为准
module.exports = {
  name: "张三",
};

//4.以module.exports为准，所以下面写法不会生效，是错误的写法
exports = {
  age: 20,
};
