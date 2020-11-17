//要创建网站服务器就要依赖系统模块http
const http = require("http");
//
const url = require("url");

//app对象就是网站服务器对象
const app = http.createServer();

//当客户端有请求来的时候
app.on("request", (req, res) => {
  //获取请求报文信息
  //re1.hearders
  // console.log(req.headers);
  //报文中的某一项
  // console.log(req.headers["accept"]);

  //获取请求地址
  // console.log(req.url);

  //获取请求方式
  //req.method  后面什么都不加会显示
  // console.log(req.method);

  //第一个参数为状态码，默认200,第二个参数为响应报文信息
  res.writeHead(200, {
    // "content-type": "text/plain", //纯文本,默认纯文本
    "content-type": "text/html;charset=utf-8",
    //告诉浏览器，当前是html文本的内容，下面的 h2标签就能被解析了 ,分号后面指定编码utf-8防止乱码
    hello: "world",
  });

  console.log("req.url:" + req.url);
  //第一个参数，要解析的url地址，
  //第二个参数， 将查询参数解析成对象形式
  let { query, pathname } = url.parse(req.url, true);
  console.log(query.name);
  console.log(query.age);

  //对于localhost：3000 返回的req.url是 ‘/’
  //这里最好用pathname，因为对于localhost:3030/?name=zhangsan&age=20 req.url返回/?name=zhangsan&age=20，就会跳到not found，而pathname只会放入/index不会将后面的参数也放入
  if (pathname == "/index" || pathname == "/") {
    res.end("<h2>Welcome to homepage 欢迎来到首页</h2>");
  } else if (pathname == "/list") {
    res.end("Welcome to listpage");
  } else {
    res.end("not found");
  }

  if (req.method == "POST") {
    res.end("post");
  } else if (req.method == "GET") {
    res.end("get");
  }

  // res.end方法结束了这一次请求，并未其响应了"<h3>hello user</h3>"这个内容
  //   res.end("<h3>hello user</h3>");
});

//网站服务器建立好之后，一定要监听端口，才能向外界提供服务
//监听端口
app.listen(3000); //本机3000端口上的这个服务
console.log("网站服务器启动成功");
