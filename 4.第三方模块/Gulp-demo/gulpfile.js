//引用gulp模块
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin"); //压缩html文件
const fileinclude = require("gulp-file-include"); //包含文件
const less = require("gulp-less"); //less语法转换成css
const csso = require("gulp-csso"); //css压缩
const babel = require("gulp-babel"); //es6转换为js
const uglify = require("gulp-uglify"); //js压缩

//使用gulp.task 建立任务
//参数： 任务名称，callback

//gulp 4.0 的任务函数中，如果任务是同步的，需要使用 done 回调。这样做是为了让 gulp 知道你的任务何时完成。
gulp.task("first", (done) => {
  console.log("第一个gulp任务执行");
  //1.使用gulp.scr获取要处理的文件,对文件的处理，硬性要求要用到.pipe()
  //2.gulp.dest('')输出到哪儿
  gulp.src("./src/css/snake.css").pipe(gulp.dest("dist/css"));
  done();
});
//用命令行工具来执行gulp : npm install gulp-cli
//执行 gulp 任务名称

//html任务
//1.html文件中代码的压缩操作
//2.抽取html文件代码中的公共部分
gulp.task("htmlmin", (done) => {
  //压缩代码
  gulp
    .src("./src/*.html")
    //抽取公共代码
    .pipe(fileinclude())
    //压缩html文件
    .pipe(htmlmin({ collapseWhitespace: true })) //{压缩空格吗： 是}
    .pipe(gulp.dest("dist")); //输出到dist文件夹下

  done();
});

//css任务
//1.less语法转换
//2.css代码压缩
gulp.task("cssmin", (done) => {
  gulp
    // 选择css目录下的所有less以及css文件
    .src(["./src/css/*.less", "./src/css/*.css"])
    //将less语法转换为css语法
    .pipe(less())
    //将css代码进行压缩
    .pipe(csso())
    .pipe(gulp.dest("dist/css"));
  done();
});

//js任务
//es6代码转换
//代码压缩
gulp.task("jsmin", (done) => {
  gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        //判断当前代码的运行环境，将代码转换为运行环境支持的代码
        presets: ["@babel/env"],
      })
    )
    //将转换后的js代码进行压缩
    .pipe(uglify())
    //输出
    .pipe(gulp.dest("dist/js"));
  done();
});

//复制文件夹
gulp.task("copy", (done) => {
  gulp.src("./src/images/*").pipe(gulp.dest("dist/images"));
  done();
});

//构建任务
//执行default任务的时候，会依次执行后面的任务
//当命名为defalut的时候 在命令行中还可以直接写gulp 运行
gulp.task("default", gulp.series(["htmlmin", "cssmin", "jsmin", "copy"]));
