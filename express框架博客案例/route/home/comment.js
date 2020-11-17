const {Comment}=require('../../model/comment');

module.exports=async (req,res)=>{
    //接收客户端传递过来的参数
   const {content,uid,aid} = req.body;

   //将评论信息存入评论集合中
  await Comment.create({
       content:content,
       uid:uid,
       aid:aid,
       time:new Date()
   })

   //将页面重定向为文章详情页面
   res.redirect('/home/article?id='+aid)
}