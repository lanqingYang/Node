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

//创建集合构造函数实例 ，要有实例，才会显式的在数据库中创建数据库和表（集合）
//创建文档
// const course = new Course({
//   name: "node.js基础",
//   author: "老师",
//   isPublished: true,
// });

//把数据插入到数据库中
// course.save();

//----------------------查询课程集合中的所有文档
// Course.find().then((result) => {
//   console.log(result);
// });

//------按条件查找
//find()返回的是一个数组
// Course.find({ _id: "5f6ddbd72771232af08db8b4" }).then((result) => {
//   console.log(result);
// });

//----findOne 返回对象，默认返回当前集合中第一条文档
// Course.findOne({ author: "李华" }).then((result) => {
//   console.log(result);
// });

//条件查询 -----匹配大于小于  年龄大于20小于30
// Course.find({ age: { $gt: 20, $lt: 30 } }).then((result) => {
//   console.log(result);
// });

//条件查询 -------匹配包含
// Course.find({ hobby: { $in: ["打豆豆"] } }).then((result) => {
//   console.log(result);
// });

//条件查询 -------选择要查询的字段(多字段空格隔开)
//id会自动查询出来 不想查询哪个字段用 在字段前加 -
// Course.find()
//   .select("age hobby -_id")
//   .then((result) => {
//     console.log(result);
//   });

//条件查询 -------按年龄进行排序
//age前面加 - 降序排序
// Course.find()
//   .sort("-age")
//   .then((result) => {
//     console.log(result);
//   });

//条件查询 ------- 跳过数据，限制查询数量（分页的时候可以使用）
Course.find()
  .skip(2) //跳过前两条文档
  .limit(2) //只查询两条文档
  .then((result) => {
    console.log(result);
  });
