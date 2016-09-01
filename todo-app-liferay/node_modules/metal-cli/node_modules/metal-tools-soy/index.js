'use strict';

var compileSoy = require('./lib/pipelines/compileSoy');
var consume = require('stream-consume');
var defaultOptions = require('./lib/options');
var merge = require('merge');
var vfs = require('vinyl-fs');

module.exports = function (options) {
	options = merge({}, defaultOptions, options);
	var stream = vfs.src(options.src)
		.pipe(compileSoy(options))
		.pipe(vfs.dest(options.dest));
	if (!options.skipConsume) {
		consume(stream);
	}
	return stream;
};
