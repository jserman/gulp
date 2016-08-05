const gulp = require("gulp");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");

//定义browserSync任务
gulp.task("browserSync", function () {
    browserSync({
        server: {
            baseDir: "dist"
        }
    })
})

//定义js任务
gulp.task("js", function () {
    return gulp.src("./app/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.reload({
            stream: true
        }));
})

//定义watch任务
gulp.task("watch", ["browserSync", "js"], function () {
    gulp.watch("./app/*.js", ["js"])
})