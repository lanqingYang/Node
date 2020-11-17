//引入user模块
const {User}=require('../../model/user')
//引入bcrypt模块
const bcrypt=require('bcrypt')

module.exports=async (req,res,next)=>{
    //接收客户端传过来的参数
    const {username,email,role,state}=req.body;
    //即将要修改的用户id
    const id=req.query.id;

   const user= await User.findOne({_id:id});

   //密码比对
   const isValue= await bcrypt.compare(req.body.password,user.password)
    if(isValue){
         //密码比对成功
         //res.send('成功');
        await User.updateOne({_id:id},{
            //这里的密码只是用来比对的，不能进行修改
            username:username,
            email:email,
            role:role,
            state:state
        })
        //重定向回用户列表页面
        res.redirect('/admin/user')
       
    }else{
        //密码比对失败
        let obj={path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改',id:id}
        next(JSON.stringify(obj));
    }

}