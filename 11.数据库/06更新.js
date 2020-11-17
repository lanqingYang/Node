const mongoose = require("mongoose");

//mongodb协议://地址/数据库名称
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) //返回promise对象
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log(err + "数据库连接失败");
  });

//创建集合规则：创建Schema构造函数的实例
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
});

//------------------------------
//使用规则创建集合
//1.第一个参数：集合名称。第二个参数：集合规则（就是Schema的实例对象）
//返回的是一个集合的构造函数
const Course = mongoose.model("Course", courseSchema); //在数据库中起的名儿：courses

//更新！！
//更新一条数据  多条匹配只改第一个 返回值{ n: 1, nModified: 1, ok: 1 }
Course.updateOne({ author: "老师" }, { author: "辉夜姬" }).then((result) => {
  console.log(result);
});

//更新多个文档,传空对象表示更改所有文档  { n: 1, nModified: 1, ok: 1 }
Course.updateMany({ author: "李华" }, { author: "大岳丸" }).then((result) => {
  console.log(result);
});
