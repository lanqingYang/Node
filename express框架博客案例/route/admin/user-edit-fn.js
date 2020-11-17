//引入joi模块
const Joi=require('joi');
//引入用户集合的构造函数
const {User,validateUser}=require('../../model/user')
//引入bcrypt模块
const bcrypt=require('bcrypt')


module.exports=async (req,res,next)=>{

    try{
        //因为validateUser(req.body)返回的是promise对象，所以前面才能加await关键字
        await validateUser(req.body)
    }catch(e){
        //验证没有通过
        //重定向回用户添加页面    这个可以修改一下
        // res.redirect('/admin/user-edit?message='+e.message) //或者
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        //JSON.stringify()将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))

    }
    
    //根据邮箱地址查询用户是否存在,找到为对象，找不到为null
   let user= await User.findOne({email:req.body.email});
    //如果用户已经存在 邮箱地址已经占用
    if(user){
       return  next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址被占用'}))
    }

    //生成随机字符串
    const salt= await bcrypt.genSalt(10);
    //加密
    const password= await bcrypt.hash(req.body.password,salt);
    //替换密码
    req.body.password=password;
    
    //将用户信息添加到数据库中
    await User.create(req.body);

    //将页面重定向回用户列表页面
    res.redirect('/admin/user')
}