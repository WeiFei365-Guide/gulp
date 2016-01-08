'use strict'

// Load some modules which are installed through NPM.
var gulp = require('gulp');
// node 中的 path 模块
var path = require('path');
// 实现能在浏览器端像 node 后端一样使用模块化
var browserify = require('browserify');
// 兼容 gulp 与 node 中的流
var source = require('vinyl-source-stream');
// 压缩
var uglify = require('gulp-uglify');
// 对应生成压缩文件的 sourcemap 文件
var sourcemaps = require('gulp-sourcemaps');
//
var rename = require('gulp-rename');
// custom utils
var utils = require('./utils.js');

// 全局导入的预编译工具
var aliasify = require('aliasify');
var aliasifyConfig = require('./aliasify.config.js');

const DEST_DIR = './dest/';
const DEST_FILE = 'patsnap.chart.js';

var watchTasks = [];
var buildTasks = [];
var allGlob = [];

// 编译检查的状态
var isOnErrorState = false;


/********************************** js file ***********************************/

const browserifyConfig = {
	//  允许生成 sourcemap 文件
	debug: true
};

/**
 * 打包文件，包括：验证、转换等
 * @param  {[type]} gulp [description]
 * @return {[type]}      [description]
 */
function getJSPackage (gulp) {
	utils.logMsg(false, {
		state: '2',
		name: 'javascript',
		operator: '1'
	});

	return function () {

		return browserify(browserifyConfig)
				.transform(aliasify, aliasifyConfig)
				//.transform(babelify)
				.require('./src/main.js', { entry: true })
		        .bundle(function(err, bff){
		            if (bff) {
		                // 避免一直弹窗
		                isOnErrorState && utils.popMsg(isOnErrorState = false);
		            }

		            utils.logMsg(false, {
		                state: '1',
		                name: 'javascript',
						operator: '2'
		            });
		        })
		        .on("error", function (err) {
		            utils.logMsg(true, err);
		            this.emit('end');
		            // 避免一直弹窗
		            !isOnErrorState && utils.popMsg(isOnErrorState = true, err);
		        })
		        .pipe(source(DEST_FILE))
		        .pipe(gulp.dest(DEST_DIR));
	};
}
/**
 * 压缩已打包的文件
 * @param  {[type]} gulp [description]
 * @return {[type]}      [description]
 */
function uglifyJSPackage (gulp) {
	utils.logMsg(false, {
		state: '2',
		name: 'javascript uglify',
		operator: '1'
	});

	return function () {

		return gulp.src(path.join(DEST_DIR, DEST_FILE))
			// 初始化，并读入 browserify 生成的 sourcemap 文件
			.pipe(sourcemaps.init({ loadMaps: true }))
	        .pipe(uglify())
	        .pipe(rename({ extname: '.min.js' }))
			// 生成 sourcemap 文件
			.pipe(sourcemaps.write('./'))
	        .pipe(gulp.dest(DEST_DIR));
	};
}
// add task
allGlob.push('src/**/**.js');
watchTasks.push('javascript');
gulp.task(watchTasks[watchTasks.length - 1], getJSPackage(gulp));
buildTasks.push('javascript-b');
gulp.task(buildTasks[buildTasks.length - 1],
    [watchTasks[watchTasks.length - 1]],
    uglifyJSPackage(gulp));


/********************************* css file ***********************************/




gulp.task('build', buildTasks);
gulp.task('watch', function () {
    return gulp.watch(allGlob, watchTasks);
});
module.exports = {
    watch: function () {
        gulp.start('watch');
    },
    build: function () {

        gulp.start('build');
    }
};
