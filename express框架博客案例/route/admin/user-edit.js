const {User}=require('../../model/user')

module.exports=async (req,res)=>{
    //标识  标识当前访问的时用户管理页面
    req.app.locals.currentLink='user';

    //获取到地址栏中的id参数，判断是修改操作还是添加操作 message:存错误信息
    const {message,id}=req.query;

    //如果当前传递了id操作
    if(id){
        //修改操作
       let user=await User.findOne({_id:id});
       //渲染用户编辑页面（修改）
       res.render('admin/user-edit',{
           message:message,
           user:user,
           //处理时跳转的地址
           link:'/admin/user-modify?id='+id,
           button:'修改'
       })
       return;
    }else{
        //添加操作
        res.render('admin/user-edit',{
            message,
            link:'/admin/user-edit',
           button:'添加'
        });
    }

   
}