'use strict';

var babelGlobals = require('babel-globals');
var gutil = require('gulp-util');
var sourceMap  = require('vinyl-sourcemaps-apply');
var through = require('through2');

module.exports = function(options) {
	options = options || {};
	var bundleFileName = options.bundleFileName || 'bundle.js';

	var files = [];
	function receiveFile(file, encoding, callback) {
		files.push({
			contents: file.contents.toString(encoding),
			options: {filename: file.path}
		});
		callback();
	}

	function compile(callback) {
		var bundle;
		try {
			bundle = babelGlobals(files, options);
		} catch (error) {
			this.emit('error', error);
			callback();
			return;
		}

		var file = new gutil.File({
	        contents: bundle.content,
	        path: bundleFileName
	    });
	    sourceMap(file, bundle.sourceMap);
	    this.push(file); // jshint ignore:line
	    callback();
	}

	return through.obj(receiveFile, compile);
};
