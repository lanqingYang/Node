//1.引入mongoose模块
const mongoose=require('mongoose')

//2.创建文章集合规则
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        minlength:4,
        maxlength:20,
        required:[true,'请填写文章题目']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请传递作者']
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    //文章封面
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }
})

//3.根据规则创建集合

const Article=mongoose.model('Article',articleSchema)

//4.将模块规则作为模块成员进行导出
module.exports={
    Article
}