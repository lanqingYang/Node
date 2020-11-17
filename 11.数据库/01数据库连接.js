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
