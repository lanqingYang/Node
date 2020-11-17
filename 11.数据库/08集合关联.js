const { truncate } = require("fs");
//引入mongoose第三方模块，用来操作数据库
const mongoose = require("mongoose");
const { stringify } = require("querystring");
//数据库链接
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log(err + "数据库连接失败");
  });

//用户集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//文章集合规则
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    //mongoose下的规定好的objectId的类型
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//用户集合
const User = mongoose.model("User", userSchema);
//文章集合
const Post = mongoose.model("Post", postSchema);

//创建用户
// User.create({ name: "辉夜姬" }).then((result) => {
//   console.log(result);
// });

//创建文章
//author为发布文章的用户的id
// Post.create({ title: "node.js", author: "5f6f1e673800240390db96b7" }).then(
//   (result) => {
//     console.log(result);
//   }
// );
Post.find()
  //填充查询(populate)类似关系型数据库中的“连接查询”,集合关联 author字段关联了User中的值
  .populate("author")
  .then((result) => {
    console.log(result);
  });
