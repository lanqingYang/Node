//导入bcrypt
const bcrypt = require("bcrypt");

async function run() {
  //生成随机字符串
  //genSalt方法接收一个数值作为参数
  //值大，生成随机字符串复杂度越高； 小=>低
  //默认值为10,promise对象
  //返回生成的随机字符串
  const salt = await bcrypt.genSalt(10);
  //对密码及进行加密
  //1.要进行加密的明文
  //2.随机字符串
  //返回值是加密后的密码
  const result = await bcrypt.hash("123456", salt);
  console.log(salt);
  console.log(result);
}

run();
