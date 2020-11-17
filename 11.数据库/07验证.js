const { truncate } = require("fs");
//引入mongoose第三方模块，用来操作数据库
const mongoose = require("mongoose");
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

//创建规则
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "请传入文章标题"],
    //必传字段
    //required：true表示title这个参数必须传 ，不允许为空,
    //第二个参数表示自定义的错误信息
    minlength: 2,
    //字符串的最小长度为2
    maxlength: [5, "标题长度不能大于5"],
    //最大长度5
    trim: true,
    //去除字符串两边！的空格
  },
  age: {
    type: Number,
    min: [18, "年龄不能小于18"],
    //数值的最小范围
    max: 100,
    //数值最大范围
  },
  publishDate: {
    type: Date,
    default: Date.now,
    //默认值，不传时间则默认当前时间
  },
  //文章 分类字段
  category: {
    type: String,
    enum: {
      values: ["html", "css", "javascript", "node.js"],
      message: "分类名称要在一定的范围内",
    },
    //enum枚举，列举出当前字段可以拥有的值。
    //当前传入的参数，必须是枚举中的，不然就报错
  },
  author: {
    type: String,
    //自定义验证规则
    validate: {
      validator: (v) => {
        //返回布尔值
        //true成功，false失败
        //v 要验证的值
        return v && v.length > 4;
      },
      //自定义错误信息
      message: "传入的值不符合验证规则",
    },
  },
});
//利用规则创建集合 集合首字母要大写
const Post = mongoose.model("Post", postSchema);
// Post.create({})then((result) => {
//   console.log(result); //会报错，因为 titile必须要

// Post.create({ title: "a" }).then((result) => {
//   console.log(result);
// }); //会报错，因为 最小长度是2

// Post.create({ title: "aaaaaaa" }).then((result) => {
//   console.log(result);
// }); //会报错，因为 最大长度是5

// Post.create({ title: "          aa a     " }).then((result) => {
//   console.log(result);
// }); //会自己去除空格

// Post.create({ title: "aa", age: 10 }).then((result) => {
//   console.log(result);
// }); //报错，数值不能小于18 ，数值大于100同理

// Post.create({ title: "aa", age: 20 }).then((result) => {
//   console.log(result);
// }); //会自动创建当前时间

// Post.create({ title: "aa", age: 30,category:'java' }).then((result) => {
//   console.log(result);
// }); //报错，类型中没有java这个选项

// Post.create({ title: "aa", age: 30, category: "html" }).then((result) => {
//   console.log(result);
// }); //成功

Post.create({ title: "aa", age: 30, category: "java", author: "bd" })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    // console.log(error);
    //获取错误信息对象
    const err = error.errors;
    //通过循环的形式拿到具体的报错信息
    for (var attr in err) {
      console.log(err[attr]["message"]);
    }
  }); //失败，不符合author的自定义规则
