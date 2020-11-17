//导入文章集合构造函数
const {Article}=require('../../model/article');
//导入评论集合构造函数
const {Comment}=require('../../model/comment');

module.exports=async (req,res)=>{
    //接收客户端传递过来的id值
    const id=req.query.id;
    //根据id查询文章详细信息
    let result=await  Article.findOne({_id:id}).lean().populate('author');
    // result=JSON.stringify(result);
    // result=JSON.parse(result);
    
    //查询当前文章所对应的评论信息
    let comment=await Comment.find({aid:id}).lean().populate('uid');
    // res.send(comment);
    // res.send(result);
    res.render('home/article',{result,comment})
}