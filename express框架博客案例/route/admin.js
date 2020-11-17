const express = require("express");
const path = require("path");

//创建博客管理页面路由
const admin = express.Router();

//渲染登陆页面
admin.get("/login", require("./admin/loginPage"));

//实现登陆功能
admin.post("/login", require("./admin/login"));

//渲染用户列表页面
admin.get("/user", require("./admin/userPage"));

//实现退出功能
admin.get("/logout", require("./admin/logout"));

//创建用户编辑页面路由
admin.get("/user-edit", require("./admin/user-edit"));

//创建实现用户添加功能的路由
admin.post("/user-edit", require("./admin/user-edit-fn"));

//实现用户修改功能
admin.post("/user-modify", require("./admin/user-modify"));

//删除用户
admin.get("/delete", require("./admin/user-delete"));

//文章列表页面路由
admin.get("/article", require("./admin/article"));

//文章编辑页面路由
admin.get("/article-edit", require("./admin/article-edit"));

//文章添加功能
admin.post("/article-add", require("./admin/article-add"));

//文章修改功能
admin.post("/article-modify", require("./admin/article-modify"));

//文章删除功能
admin.get("/article-delete", require("./admin/article-delete"));

//传出去
module.exports = admin;
