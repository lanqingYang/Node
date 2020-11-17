//引入用户模块
const { Article } = require("../../model/article");

module.exports = async (req, res) => {
  //获取id
  const id = req.query.id;
  //从数据库中删除
  await Article.findOneAndDelete({ _id: id });
  //重定向回用户列表
  res.redirect("/admin/article");
};
