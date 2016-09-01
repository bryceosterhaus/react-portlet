'use strict';

var addJQueryAdapterRegistration = require('./addJQueryAdapterRegistration');
var combiner = require('stream-combiner');
var buildGlobalsNoSourceMaps = require('metal-tools-build-globals/lib/pipelines/buildGlobalsNoSourceMaps');
var defaultOptions = require('../options');
var gulpif = require('gulp-if');
var merge = require('merge');
var sourcemaps = require('gulp-sourcemaps');
var wrapper = require('gulp-wrapper');

module.exports = function(options) {
	options = merge({}, defaultOptions, options);
	return combiner(
		addJQueryAdapterRegistration(),
		gulpif(options.sourceMaps, sourcemaps.init()),
		buildGlobalsNoSourceMaps(options),
		wrapper({
			header: 'new (function () { ',
			footer: '})();'
		}),
		gulpif(options.sourceMaps, sourcemaps.write('./'))
  );
};
