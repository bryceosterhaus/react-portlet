'use strict';

var babelGlobals = require('gulp-babel-globals');
var defaultOptions = require('../options');
var merge = require('merge');

module.exports = function(options) {
	options = merge({}, defaultOptions, options);
	return babelGlobals({
		babel: {
			compact: false,
			presets: options.babelPresets,
			sourceMaps: options.sourceMaps
		},
		bundleFileName: options.bundleFileName,
		cache: options.cacheNamespace,
		globalName: options.globalName
	});
};
