const { Article } = require("../../model/article");

module.exports = async (req, res) => {
  //标识  标识当前访问的时文章管理页面
  req.app.locals.currentLink = "article";
  const id = req.query.id;
  //   res.send(id);
  //如果有id，说明是在进行修改操作
  if (id) {
    //修改操作
    let article = await Article.findOne({ _id: id });
    // res.send(article);
    //渲染用户修改页面
    res.render("admin/article-edit", {
      article: article,
      link: "/admin/article-modify?id=" + id,
      button: "修改",
    });
  } else {
    res.render("admin/article-edit", {
      link: "/admin/article-add",
      button: "提交",
    });
  }
};
