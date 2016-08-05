const gulp = require("gulp");

// 下面会对gulp4.0的几个基本的接口座椅个基本的介绍
// 1、需要借助于gulp4.0的版本，这个版本还没有正式发布，所以需要按照如下的方式安装
// 全局安装：npm install -g gulpjs/gulp#4.0
// 局部安装：npm install --save-dev gulpjs/gulp#4.0


/*
API1：gulp.task([name,]fn);
	name：gulp任务的名称，如果不提供，将使用fn.name或者fn.displayName来作为任务的名称
	fn：异步回调函数，这个函数会在gulp执行相应的任务的时候执行，这个函数可以接收一个参数，也是一个函数，会在任务执行完成的时候调用
	或者，fn可以返回一个promise，stream，child process，RxJs observable以表示任务的结束
	fn.name，fn.displayName：由于fn.name不可以修改，针对匿名函数可以提供一个displayName属性来充当任务的名称
	fn.description：使用gulp --tasks时候，此字段会出现在task的名字的后面
	
	基本的模式
		gulp.task("taskName", function([done]){
			1、done();
			2、return a promise
			3、return a stream
			4、return a child process
			5、return a RxJs observable
		})
*/

gulp.task("start", function(done){
	console.log("start gulp");
	done();  //调用 表示任务完成
})

function hello(){
	console.log("hello");
}

gulp.task(hello);

gulp.task(function noname(){
	console.log("a noname function");
})

/*
	gulp.src(globs[, options])：获得后续操作的文件流
		globs：String or Array，表示输入文件的通配符，可以是字符串，也可以是字符串数组
			如：gulp.src(["*.js","!b*.js","bad.js"])

		基本的使用框架：
			gulp.src("globs",{
				一些基本的选项对象：

				cwd：表示blobs的当前目录，默认是process.cwd(); 

				base：表示输入文件的基准地址，默认是第一个通配符前的地址，如gulp.src("client/js/** /*.js")  base就是client/js，在保证输出目录结构的时候有用

				buffer：表示文件在内存中的存存储形式，默认是true，如果是false，那么返回的文件形式将是file.contents

				since："Date or Number"，文件最后修改的值小于这个值，将会被忽略，这里可以使用gulp.lastRun，后续会讲解

				allowEmpty：布尔值，允许空文件，否则src不存在的时候会报错

				read：是否会真正的读取文件，如果为false则只有文件的meta信息会被读取
			})


	gulp.dest(path[, options])：输出文件
		path：输出文件的目录，可以是字符串，也可以是一个函数
	基本用法：
		gulp.src("")
			.pipe(gulp.dest(path,{
				cwd："当前目录，只有path是相对路径的时候才会用到"，
				
				mode：输出文件的mode，默认和源文件是一样的或者和process的mode一致，如：‘0744”等

				dirMode：输出文件夹的mode，默认是process的mode，“String or number”
				
				overwrite：布尔值，是否覆盖已经存在的文件
			}))

 */

// 例子：拷贝css文件到build文件夹下面
const config = {
	buildDir : "./build"
}

gulp.task("css", function(){
	return gulp.src("./src/css/**/*.css",{base:"src"}).pipe(gulp.dest(config.buildDir));
})

/*
	gulp.parallel(...tasks)：构造并行任务
	gulp.series(...tasks)：构造串行任务
 */


gulp.task("one", function(done){
	console.log("one");
	done();
})

function two(done){
	console.log("two");
	done();
}

gulp.task("three", function(done){
	console.log("three");
	done();
})

function four(done){
	console.log("four");
	done();
}

gulp.task("five",function(done){
	console.log("five");
	done();
})

//运行顺序：one-two-four-five-three
gulp.task("series", gulp.parallel("one", gulp.series(two, "three"), gulp.parallel(four, "five")));


/*
	gulp.symlink(folder[, options])：
		和gulp.dest的作用是一样的，只不过生成的软连接
 */

/*
	gulp.watch(glob[, option][, fn])：监听文件的变化
		glob：String or Array
	var watch = gulp.watch("glob",{
		ignored：glob,  //忽略的文件
		usePolling：false, //一般用于网络文件或者虚拟机里的文件
		cwd：'', //glob的base路径
		alwaysStat：'' //布尔值，如果需要fs.stats的所有事件，可以设置为true，稍微的影响性能
	},function(){
		//do something here
	})

	gulp.watch返回一个FS的watch：可以接收add，change，unlink事件
		这些事件的处理函数接收两个参数：
			path：文件的路径，如果上述的option.cwd指定，path为相对路径
			stats：一个filestat对象，可能会被提供，如果option.alwaysStat == true则stats一定会被提供
	watch.on("add|change|unlink", function(path,stats){});

	除此，返回的watch对象还存在一些方法
		watch.close();  //关闭监听的文件
		watch.add("glob"); //继续添加监听文件
		watch.unwatch("glob"); //取消某个文件的监听，其余的继续
 */

gulp.task("watch", function(){
	var watcher = gulp.watch("css/**/*.css",{
		cwd:"src"
	}, function(){
		console.log("某个文件被改变了");
	});

watcher.on("add|unlink|change", function(path,stats){
	console.log("File"+path+"was added|changed|unlinked");
})
})

