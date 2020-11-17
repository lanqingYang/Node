//引入数据库模块
const mongoose = require("mongoose");

//连接数据库
mongoose
  .connect("mongodb://localhost/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败" + err);
  });
