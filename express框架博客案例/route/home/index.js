const {Article}=require('../../model/article');

//导入分页模块
const pagination= require('mongoose-sex-page');


module.exports=async (req,res)=>{
    //接收传递过来的页码
    const page=req.query.page;
    
    //从数据库中查询数据
    let result =await pagination(Article)
    .page(page)
    .size(2)
    .display(3)
    .populate('author')
    .exec();
    // res.send(result);
    result = JSON.stringify(result);
    result = JSON.parse(result);



    res.render('home/default',{
        result:result,
    });

}