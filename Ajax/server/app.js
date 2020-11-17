//引入express框架
const express = require('express');

//路径处理
const path=require('path');
const bodyParser=require('body-parser');
const fs=require('fs');

//创建服务器
const app=express();

//静态资源访问路径
app.use(express.static(path.join(__dirname,'public')));
//根据 传递参数格式来进行设置
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//创建路由

//01
app.get('/first',(req,res)=>{
    res.status(400).send('Hello Ajax');
})

//02
//虽然这里返回的是个JSON对象，但是最终都会被转换为对象字符串进行传输(原因:见 ajax笔记 7))
app.get('/responseData',(req,res)=>{
    res.send({
        "name":"张三"
    })
})

//03 get请求参数
app.get('/get',(req,res)=>{
    res.send(req.query);
})

//04 post请求
app.post('/post',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

//05 json格式
app.post('/json',(req,res)=>{
    res.send(req.body);
})

//06 状态码改变
app.get('/readystate',(req,res)=>{
    res.send('hello');
})

// 07 错误
app.get('/error',(req,res)=>{
    //打印不存在的变量，模拟服务求端出错
    // console.log(abc)
    res.status(400).send('not ok');
})

//08 缓存问题
app.get('/cache',(req,res)=>{
    fs.readFile('./test.txt',(err,result)=>{
            res.send(result);
    })
})

//端口监听
app.listen(4000);

//控制台输出提示
console.log('服务器启动成功')

