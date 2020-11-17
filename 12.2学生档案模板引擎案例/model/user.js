//引入数据库模块
const mongoose = require("mongoose");

//通过monoose来创建学生信息的实例化规则 和集合

//集合规则
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //必填字段
    minlength: [2, "名字长度小于两个字符"],
    maxlength: [10, "名字长度大于10个字符"],
  },
  age: {
    type: Number,
    min: 10,
    max: 25,
  },
  sex: {
    type: String,
    enum: {
      values: ["男", "女"],
      massage: "性别只能为男或者女",
    },
  },
  email: {
    type: String,
  },
  hobbies: [String],
  college: String,
  enterDate: {
    type: Date,
    default: Date.now,
  },
});

//使用集合规则创建学生集合信息
const Student = mongoose.model("Student", studentSchema);

//将学生集合信息进行导出
module.exports = Student;
