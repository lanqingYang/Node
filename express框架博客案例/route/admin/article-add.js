//引入formidable模块
const formidable=require('formidable');
const path=require("path")
const {Article}=require('../../model/article')


module.exports=(req,res)=>{
    //1.创建表单解析对象
    const form=  new formidable.IncomingForm();

    //2.配置上传文件的存放位置 (最好绝对路径)
    form.uploadDir=path.join(__dirname,'../','../','public','uploads');

    //3.保留上传文件的后缀 true
    form.keepExtensions=true;

    //4.解析表单
    form.parse(req,(err,fields,files)=>{
        //1.err错误对象 如果表单解析成功，err为null 失败：存错错误信息
        //2.fields 对象类型 保存普通该表单数据 （eg：name：zhangsan）
        //3.files 对象类型 保存了和上传文件相关的数据 (eg:头像)
        //以public字符串来进行分割，前面部分和后面部分都放入数组 ,因为这里的path是绝对路径，在别人的本机上访问访问不了
        // console.log(files.cover.path.split('public')[1])
        Article.create({
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.path.split('public')[1],
            content:fields.content,
        });
        //将页面重定向到文章列表页面
        res.redirect('/admin/article');
    })
    // res.send('ok')
}