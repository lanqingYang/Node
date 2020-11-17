//创建表单解析对象
const formidable = require("formidable");
const path = require("path");
const { Article } = require("../../model/article");
module.exports = (req, res) => {
  const id = req.query.id;
  //1.创建表单解析对象
  const form = formidable.IncomingForm();
  //2.配置上传文件的位置
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
  //3.保留上传文件的后缀
  form.keepExtensions = true;
  //4.解析表单
  form.parse(req, async (err, fields, files) => {
    //filds:普通表单数据
    //files：上传文件相关数据
    // res.send(files);
    //上传文件被修改
    if (files.cover.size != 0) {
      let article = await Article.updateOne(
        { _id: id },
        {
          title: fields.title,
          publishDate: fields.publishDate,
          content: fields.content,
          cover: files.cover.path.split("public")[1],
        }
      );
      //   res.send(article);
      res.redirect("/admin/article");
    } else {
      //上传文件未被修改
      let article = await Article.updateOne(
        { _id: id },
        {
          title: fields.title,
          publishDate: fields.publishDate,
          content: fields.content,
        }
      );
      res.send(article);
    }
  });
  //   res.send("ok");
  res.redirect("/admin/article");
};
