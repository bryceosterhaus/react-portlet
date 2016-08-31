'use strict';

var buildJQuery = require('./lib/pipelines/buildJQuery');
var consume = require('stream-consume');
var vfs = require('vinyl-fs');

module.exports = function (options) {
	options  = options || {};
	var stream = vfs.src(options.src || 'src/**/*.js')
		.pipe(buildJQuery(options))
		.pipe(vfs.dest(options.dest || 'build/jquery'));
	consume(stream);
	return stream;
};
