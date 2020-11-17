//导入用户集合构造函数
const {User}=require('../../model/user')

module.exports= async (req, res) => {
    //标识  标识当前访问的时用户管理页面
    req.app.locals.currentLink='user';
    
  //接收客户端传来的当前页参数,用户没有输入查询页码就从1开始
  let page=req.query.page || 1;
  //每页显示的数据条数
  let pagesize=2;
  //查询用户数据的中枢
  let count= await User.countDocuments({})
  //总页数 总数/每页条数 再向上取整  eg：3.1 =>4;3.8=>4
  let total=Math.ceil(count/pagesize)
  //页码对应的数据查询开始位置
  let start= (page-1) * pagesize


  //将用户信息从数据库中查询出来
  let users=await User.find({}).limit(pagesize).skip(start);
  //渲染用户列表模模块
    res.render("admin/user", {
      msg:req.session.username,
      users:users,
      page:page,
      total:total
    });
   
  }