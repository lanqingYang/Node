module.exports=(req,res)=>{
    //删除session
    req.session.destroy(function(){
        //删除cookie ，后面参数是 要删除的cookie的名字，通过页面检查可以找到对应的cookie的名字  express-session中默认名字为connect.sid
        res.clearCookie('connect.sid');
        //重定向到用户登陆页面
        res.redirect('/admin/login');
        //清除模板中的用户信息 
        req.app.locals.userInfo=null;
    })
}