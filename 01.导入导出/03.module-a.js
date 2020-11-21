//导出a.js中的内容 ，在b.js中运用起来
//exports对象对模块内部的内容进行导出 用require方法导入其他模块

const add = (n1, n2) => n1 + n2;

exports.add = add;
//第一个add是exports对象的属性，后一个add是指 上面的const add
