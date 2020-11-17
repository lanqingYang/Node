//引入User模块
const {User}=require('../../model/user')

module.exports=async (req,res)=>{
    //获取要获取的用户id
    const id=req.query.id;
    await User.findOneAndDelete({_id:id});
    //重定向回用户列表页面
    res.redirect('/admin/user')
}