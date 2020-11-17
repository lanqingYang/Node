module.exports=(req,res,next)=>{
    //判断用户访问的是否是登陆页面
    //判断用户登陆状态
    //登陆则放行
    //不是登陆 重定向到登陆页面
    if(req.url!='/login' && !req.session.username){
        res.redirect('/admin/login')
    }else{
        //如果用户是登陆状态 并且是一个普通用户
        if(req.session.role =='normal'){
           return res.redirect('/home/')
        }
        //用户是登陆状态，请求放行
        next();
    }
}
