'use strict';

var buildGlobals = require('./lib/pipelines/buildGlobals');
var defaultOptions = require('./lib/options');
var consume = require('stream-consume');
var merge = require('merge');
var vfs = require('vinyl-fs');

module.exports = function (options) {
	options = merge({}, defaultOptions, options);
	var stream = vfs.src(options.src)
		.pipe(buildGlobals(options))
		.pipe(vfs.dest(options.dest));
	if (!options.skipConsume) {
		consume(stream);
	}
	return stream;
};
