const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const app = http.createServer();

app.on("request", (req, res) => {
  //   获取用户请求路径
  let pathname = url.parse(req.url).pathname;

  //当直接访问3000服务器地址的时候，也应该显示主页面
  pathname = pathname == "/" ? "/snake.html" : pathname;

  //   __dirname 获取当前文件所在的绝对路径
  //   将用户的请求路径转换为实际的服务器硬盘路径
  let realPath = path.join(__dirname, "public", pathname);

  //通过路径可以返回这个资源的类型
  let type = mime.getType(realPath);

  fs.readFile(realPath, (error, result) => {
    if (error != null) {
      res.writeHead(404, {
        "content-type": "text/html;charset=utf-8",
      });
      res.end("文件读取失败");
      return;
    }
    res.writeHead(200, {
      //指定返回资源的类型
      "content-type": type,
    });
    res.end(result);
  });
  //------------------
  //不用绝对路径拼接
  //   fs.readFile("." + req.url, (error, result) => {
  //     //这里会输出/publi/snack.html 正确的第一个参数应该为./publi/snack.html
  //     console.log(req.url);
  //     if (error != null) {
  //       res.writeHead(404, {
  //         "content-type": "text/html;charset=utf-8",
  //       });
  //       res.end("文件读取失败");
  //       return;
  //     }
  //     res.end(result);
  //   });
});

app.listen(3000);
console.log("服务器启动了");
