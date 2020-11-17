//搭建网站服务器，实现客户端与服务器端的通信
//连接数据库，创建用户集合，向集合中插入文档
//访问/list，查询所有用户信息
//   实现路由功能（获取请求方式和请求地址）
//   呈现用户列表页面
//   从数据库中查询用户信息，将用户信息展示在列表中
//将用户信息和表格HTML进行拼接，并将拼接结果响应回客户端
//访问/add，呈现表单页面，实现添加用户信息功能
//访问/modify，呈现修改页面，实现修改用户信息功能
//访问/delete，实现删除用户功能

const http = require("http");
const mongoose = require("mongoose");
const url = require("url");

//数据库连接 27017是mongodb数据库的默认端口
mongoose
  .connect("mongodb://localhost/playround", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch(() => {
    console.log("数据库连接失败");
  });

//创建用户集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 18,
    max: 80,
  },
  password: String,
  email: String,
  hobbies: [String],
});

const User = mongoose.model("User", userSchema);
//创建服务器
const app = http.createServer();

//为服务器对象添加请求事件
app.on("request", async (req, res) => {
  //请求方式
  const method = req.method;
  //通过对象解构的方式结构出pathname
  //请求地址
  const { pathname } = url.parse(req.url);

  if (method == "GET") {
    //get方式大多是数据的请求或页面的成立

    if (pathname == "/list") {
      //成立列表页面
    }
  } else if (mothod == "POST") {
    //post一般是实现一些功能，比如添加数据或者修改数据
  }
  res.end("ok");
});

//监听窗口
app.listen(3000);
