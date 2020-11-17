//引入 bcrypt加密
const  bcrypt = require("bcrypt");
//引入Joi模块
const Joi=require('joi')

//创建用户集合
const mongoose = require("mongoose");

//创建集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    //保证邮箱地址在插入数据库时不重复
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //管理员：admin
  //普通用户：normal
  role: {
    type: String,
    required: true,
  },
  //0：启用状态，1：禁用状态
  state: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

async function creatUser() {
  let salt = await bcrypt.genSalt(10);
  let pass = await bcrypt.hash("123456", salt);
  const user = await User.create({
    username: "lanqing",
    email: "810122753@qq.com",
    password: pass,
    role: "admin",
    state: 0,
  });
}

// creatUser();

//验证用户信息 ，这里返回的是promise对象
const validateUser=user=>{
   //定义对象验证规则
   const schema={
    username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
    email:Joi.string().email().required().error(new Error('用邮箱不符合规则')),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则')),
    role:Joi.string().valid('normal','admin').required().error(new Error('角色值不符合规则')),
    state:Joi.string().valid('0','1').required().error(new Error('状态值不符合规则'))
}

        //实施验证
        return  Joi.validate(user,schema)
}

//将用户模块作为模块成员进行导出
module.exports = {
  User,
  validateUser,
};
