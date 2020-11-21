const http = require("http");
//url这个模块是处理请求地址的，而post请求不会改变请求地址，所以post中不适用url
//const url = require("url");

//处理请求参数模块
const queryString = require("querystring");

//创建一个服务器
const app = http.createServer();

app.on("request", (req, res) => {
  //post参数是通过事件的方式接受的
  //data 当请求参数传递的时候触发data事件
  //end 当参数传递完成的时候触发end事件

  //post参数不是一次就接受完的！
  let postParams = "";
  //params拿到当前传递过来的那个参数
  req.on("data", (params) => {
    postParams += params;
  });
  req.on("end", () => {
    console.log(queryString.parse(postParams));
  });

  //对于客户端给的请求，服务器端都要给出响应，否则客户端将一直处于等待的状态
  res.end("ok");
});

//监听端口
app.listen(3000);
console.log("服务器启动成功");
