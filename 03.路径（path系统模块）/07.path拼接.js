//拼接路径 path.join('','',....)
//public/uploads/avatars

const path = require("path");

const finalPath = path.join("public", "uploads", "avatar");

console.log(finalPath);
