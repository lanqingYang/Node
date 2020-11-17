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

//删除--------
//查找到一条文档并且删除，返回删除的文档，如果查询条件匹配了多个文档，删除第一个----------
Course.findOneAndDelete({ _id: "5f6e9b39c02cd52b2ca85fb2" }).then((result) => {
  console.log(result);
});

//删多条数据（文档）
//返回一个对象{ n: 2, ok: 1, deletedCount: 2 } n:受影响的数据，ok：表删除成功 deletedCount：删除文档数
Course.deleteMany({ name: "node.js基础" }).then((result) => {
  console.log(result);
});
