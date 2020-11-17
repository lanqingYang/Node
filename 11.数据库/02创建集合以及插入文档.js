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

//使用规则创建集合
//1.第一个参数：集合名称。第二个参数：集合规则（就是Schema的实例对象）
//返回的是一个集合的构造函数
const Course = mongoose.model("Course", courseSchema); //在数据库中起的名儿：courses

//创建集合构造函数实例 ，要有实例，才会显式的在数据库中创建数据库和表（集合）
//创建文档
const course = new Course({
  name: "node.js基础",
  author: "老师",
  isPublished: true,
});

//把数据插入到数据库中
course.save();
