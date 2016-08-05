const gulp = require("gulp");
const del = require("del");
const path = require("path");

gulp.task("watch", function(){
	var watcher = gulp.watch("css/**/*.css",{cwd:"src"});
	
	//设置一些监听函数
	watcher.on("add",(path)=>console.log("add=>",path));
	watcher.on("change",(path)=>console.log("change=>",path));
	watcher.on("unlink",(path)=>{
		console.log("unlink=>",path);
	});
})
