# gulp

Gulp 工程化使用向导。


## 安装 & 使用

* 拷贝当前项目到本地：

	```
	git clone https://github.com/WeiFei365-ls/gulp.git
	```

* 合并 ```package.json``` 文件；三个需要合并的 key，如下：

	```
	{
	  "scripts": {
	    "watch": "node ./webpack/cmd.watch.js",
	    "w": "node ./webpack/cmd.watch.js",
	    "build": "node ./webpack/cmd.build.js",
	    "b": "node ./webpack/cmd.build.js"
	  },
	  "devDependencies": {
	    "aliasify": "^1.8.1",
	    "babel-preset-es2015": "^6.3.13",
	    "babelify": "^7.2.0",
	    "browserify": "^12.0.1",
	    "chalk": "^1.1.1",
	    "gulp": "^3.9.0",
	    "gulp-notify": "^2.2.0",
	    "gulp-plumber": "^1.0.1",
	    "gulp-sourcemaps": "^1.6.0",
	    "gulp-uglify": "^1.5.1",
	    "node-notifier": "^4.4.0",
	    "vinyl-buffer": "^1.0.0",
	    "vinyl-source-stream": "^1.1.0"
	  },
	  "aliasify": "./webpack/aliasify.config.js"
	}
```

* 拷贝当前项目中的 ```webpack``` 目录到你的项目中；

* 根据你的项目需求，修改 ```webpack/gulpfile.js``` 文件中的内容。

* 命令行中进入到你的项目根目录，输入以下命令 ```npm run b``` 打包；还支持以下的命令：

	* ```npm run watch``` 实时监控代码的更改，并打包；
	* ```npm run w``` 等同于 ```npm run watch```
	* ```npm run build``` 直接一次性打包；
	* ```npm run b``` 等同于 ```npm run build```

## 详细说明

#### ```package.json``` 中的 *aliasify* 配置项的作用：

允许在 require 或 import 一些常用的自定义导出时，省去路径，比如，在项目中有个 utils 导出，而且在项目中的很多地方会用到这个 utils，像这样：
	
	```
	var utils = require('../../utils.js');
	```
	
当配置了 aliasify 后，只需要在 ```webpack/aliasify.config.js``` 文件中进行配置，然后这样使用：

	```
	// require('utils') 中的名称 utils 是在 webpack/aliasify.config.js 中对应的名称
	var utils = require('utils');
	```

#### ```gulpfile.js``` 中的 javascript task

详细说明参考 ```getJSPackage``` 函数的注释说明；


## Futures

1. 引入


## 相关参考

* Gulp & Browserify 融合: [http://csspod.com/using-browserify-with-gulp/](http://csspod.com/using-browserify-with-gulp/)
* 其他