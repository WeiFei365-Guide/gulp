'use strict'

var commUtils = require('commUtils');

const say = 'Hello ';

module.exports = function (name) {
    commUtils.printLog(say + name);
};
