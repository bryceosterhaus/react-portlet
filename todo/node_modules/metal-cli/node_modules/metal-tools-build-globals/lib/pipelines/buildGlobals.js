'use strict';

var combiner = require('stream-combiner');
var defaultOptions = require('../options');
var sourcemaps = require('gulp-sourcemaps');
var buildGlobalsNoSourceMaps = require('./buildGlobalsNoSourceMaps');
var gulpif = require('gulp-if');
var merge = require('merge');

module.exports = function(options) {
	options = merge({}, defaultOptions, options);
	return combiner(
		gulpif(options.sourceMaps, sourcemaps.init()),
		buildGlobalsNoSourceMaps(options),
		gulpif(options.sourceMaps, sourcemaps.write('./'))
	);
};
