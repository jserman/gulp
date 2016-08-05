var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
//var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var del = require("del");
/*
    1、gulp.task("任务名称",function(){}); 
        我们在命令行中可以这样使用:gulp 任务名称
        这个时候就会调用我们的回调函数
    2、gulp.src:通过这个方法获取源文件
    3、gulp.dest:通过这个方法输出到我们的目标文件夹
        上面的这些文件都是以stream的方式进行传送的，所以我们需要使用pipe去传送我们的输出输入流
*/
gulp.task("study", function () {
    console.log("gulp开始工作了");
})

gulp.task("sass", function () {
    return gulp.src("./app/scss/**/*.+(scss|sass)")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//监听文件的改变
gulp.task("watch", ["browserSync", "sass"], function () {
    gulp.watch("./app/scss/**/*.+(scss|sass)", ["sass"]);
    gulp.watch("./app/*.html", browserSync.reload);
    gulp.watch("./app/js/**/*.js", browserSync.reload);
})

//使用browser-sync实现页面的自动刷新
gulp.task("browserSync", function () {
    browserSync({
        server: {
            baseDir: "app"
        }
    })
})

gulp.task("useref", function () {
    return gulp.src("./app/*.html")
        .pipe(useref())
        //        .pipe(uglify())
        .pipe(gulp.dest("dist"));
})

gulp.task("uglify", function () {
    return gulp.src("./dist/js/**/*.js").pipe(uglify()).pipe(rename("main.min.js")).pipe(gulp.dest("./dist/js"));
})

//gulp.task("imagemin", function () {
//    return gulp.src("./app/images/**/*.+(png|jpg|jpeg|gif)").pipe(imagemin({
//        interlaced: true
//    })).pipe(gulp.dest("./dist/images"));
//})

gulp.task("clean", function () {
    del("./dist");
})