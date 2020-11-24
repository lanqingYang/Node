//引入express框架
const express = require('express');
//路径处理
const path=require('path');

const fomidable=require('formidable')

const app=express();

//解决跨域问题 中间件
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//05 FormData使用
//body-parse这个模块只能处理客户端向服务器端传递过来的post请求参数，
//但是这个模块不能处理客户端向服务器端传递过来的formData对象
//而是利用formidable模块
app.post('/formData',(req,res)=>{
    //创建formidable表单解析对象
    const form=new fomidable.IncomingForm();
    //解析客户端传递过来的FormData对象
    //fields:表单中的普通请求参数，files：和文件上传的一些相关信息
    form.parse(req,(err,fields,files)=>{
        res.send(fields);
    });
});



//04获取县城信息
app.get('/area',(req,res)=>{
    const arr=[{id:'10',name:'道里区'},
    { id:'11',name:'南港区' },
   {id:'12',name:'平房区'},
   {id:'13',name:'松北区'},];
   res.send(arr);
})

//04获取城市信息
app.get('/cities',(req,res)=>{
    const arr=[{id:'300',name:'哈尔滨市'},
    { id:'301',name:'齐齐哈尔市' },
   {id:'302',name:'牡丹江市'},
   {id:'303',name:'佳木斯市'},];
   res.send(arr);
})

//04获取省份信息
app.get('/province',(req,res)=>{
    const arr=[{id:'001',name:'黑龙江'},
    { id:'002',name:'四川省' },
   {id:'003',name:'河北省'},
   {id:'004',name:'江苏省'},];
   res.send(arr);
})



//03 搜索框内容自动提示案例
app.get('/searchAutoPrompt',(req,res)=>{
    let {key}=req.query;
    const arr=['百度一下','百度一下，你就知道','百度一下，也不知道'];
    var arrnew=[];
    arr.forEach((item)=>{
        if(item.includes(key)){
            arrnew.push(item);
        }
    })
    res.send(arrnew);
})



//02邮箱唯一性案例
app.get('/verifyEmailAdress',(req,res)=>{
    let {email}=req.query;
   if(email=='810122753@qq.com'){
    res.status(400).send({message:'该邮箱地址已经存在'});
   } else{
       res.send({message:'√'});
   }
})


//监听3000窗口
app.listen(3000)
console.log('服务器开启成功...')