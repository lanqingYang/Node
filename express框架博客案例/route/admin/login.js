//导入用户集合构造函数
const { User } = require("../../model/user");
//引入bcrypt
const bcrypt=require('bcrypt');

const login=async (req, res) => {
    //接收请求参数
    //解构操作
    const { email, password } = req.body;
    //二次判断
    //用户没有输入邮箱
    if (email.trim() == 0 || password.trim() == 0) {
      res.status(400).render("admin/error", {
        msg: "邮箱或密码错误",
      });
    }
  
    //根据邮箱地址查询用户信息,通过异步函数的方式获取返回值
    //如果查询到了用户，user变量为对象类型
    //查询不到为空
    let user = await User.findOne({ email });
    if (user) {
      //比对客户端传来的密码和用户信息密码
      //方法返回布尔值
      let isEqual=await bcrypt.compare(password,user.password)
      if (isEqual) {
        //登陆成功
        //将用户名存储到请求对象中
        req.session.username=user.username;
        //将用户角色存储到session对象中
        req.session.role=user.role;
        // res.send("登陆成功");
        //重定向到用户列表页面
        //req.app拿到的就是app.js里面的那个app，放在app.locals下，就能在所有模板中都拿到这个值，在退出登陆的时候也要记得将此值变为null 
        req.app.locals.userInfo=user;
        //对用户的角色进行判断,admin就跳转到管理员用户页面，普通用户就跳转到博客首页
        if(user.role =='admin'){
          res.redirect('/admin/user')
        }else{
          res.redirect('/home/')
        }
        res.redirect('/admin/user')
      } else {
        res.status(400).render("admin/error", {
          msg: "邮箱地址或者密码错误",
        });
      }
    } else {
      res.status(400).render("admin/error", {
        msg: "邮箱地址或者密码错误",
      });
    }
  }

  module.exports=login