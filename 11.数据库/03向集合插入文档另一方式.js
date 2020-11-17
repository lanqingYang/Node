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

//create方法，向集合中插入文档
Course.create(
  {
    name: "javascript",
    author: "李华",
    isPublished: false,
  },
  (err, result) => {
    console.log(err);
    console.log(result);
  }
);

//create的方法返回promise对象，所以支持异步函数的语法
Course.create({
  name: "html/css",
  author: "李华2",
  isPublished: false,
})
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
