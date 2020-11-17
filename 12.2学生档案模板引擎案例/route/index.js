//引入router模块，返回值是用来创建路由对象的
const getRouter = require("router");
//引入模板引擎
const template = require("art-template");
//将字符串参数转换为对象格式
const querystring = require("querystring");

//获取路由对象
const router = getRouter();

//学生信息集合
const Student = require("../model/user");

//呈递学生档案信息页面
router.get("/add", (req, res) => {
  let html = template("index", {});
  res.end(html);
});

//呈递学生档案信息列表页面
router.get("/list", async (req, res) => {
  //获取所有的student数据,只有用异步函数，才能通过await获取异步函数返回的值
  let students = await Student.find();
  console.log(students);
  let html = template("list", {
    students: students,
  });
  res.end(html);
});

//实现学生信息的添加功能
router.post("/add", (req, res) => {
  //接受请求参数
  let formData = "";
  //绑定两个事件 data end
  req.on("data", (param) => {
    //这里的param是一个字符串，需要转换为对象，用到queryString系统模块
    formData += param;
  });
  req.on("end", async () => {
    //创建新数据
    await Student.create(querystring.parse(formData));
    //重定向
    res.writeHead(301, {
      Location: "/list",
    });
    res.end();
  });
});

//导出
module.exports = router;
