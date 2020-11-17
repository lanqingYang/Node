//导入文章集合构造函数
const { Article } = require("../../model/article");
//导入分页模块,返回一个方法
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  //接收客户端传来的页码
  const page = req.query.page;
  //标识  标识当前访问的时文章管理页面
  req.app.locals.currentLink = "article";

  let articles = await pagination(Article)
    // .find()
    .page(page) //   page：指定当前页
    .size(1) //   size：指定每页显示多少条数据
    .display(2) //   display：指定客户端要显示的页码数量
    .populate("author") //查询所有文章数据,联合查询populate('author')
    .exec(); //向数据库发送查询请求
  articles = JSON.stringify(articles);
  articles = JSON.parse(articles);
  //   res.send(articles);
  //渲染文章列表页面
  res.render("admin/article", {
    articles, //在进行了分页查询步骤后，articles现在已经是一个对象而不是一个数据，需要在模板中进行更改，此时循环的应该是对象中的 records属性
  });
};
