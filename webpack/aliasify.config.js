'use strict'

/**
 * Created by Wei Fei on 2016/01/08
 * @description 配置可全局导入的工具
 */

var path = require('path');
var utils = require('./utils.js');


module.exports = {

    aliases: {
        'commUtils': path.join(utils.SourcePaths.src, 'scripts', 'utils', 'utils.common.js')
    },
    // no debugger msg
    verbose: false
};
