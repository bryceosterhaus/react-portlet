'use strict';

var babelDeps = require('gulp-babel-deps');
var babelPluginAmd = require('babel-plugin-transform-es2015-modules-amd');
var babelPresetMetal = require('babel-preset-metal');
var combiner = require('stream-combiner');
var defaultOptions = require('../options');
var gulpif = require('gulp-if');
var merge = require('merge');
var path = require('path');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through2');
var wrapper = require('gulp-wrapper');

module.exports = function(options) {
  options = merge({}, defaultOptions, options);
	return combiner(
		gulpif(options.sourceMaps, sourcemaps.init()),
		buildAmdNoSourceMaps(options),
		gulpif(options.sourceMaps, wrapper({
			footer: function(file) {
				return '\n//# sourceMappingURL=' + path.basename(file.path) + '.map';
			}
		})),
		// Temporary fix for babel 6 problem with typeof together with amd. See
		// https://phabricator.babeljs.io/T6644 for more details.
		// TODO: Remove when issue is fixed by babel.
		replace(
			'typeof obj === \'undefined\' ? \'undefined\' : _typeof(obj);',
			'typeof obj;'
		),
    replace(
			'_typeof(Symbol.iterator)',
			'typeof Symbol.iterator'
		),
		gulpif(options.sourceMaps, sourcemaps.write('./', {addComment: false})),
    updatePath(options)
	);
};

function buildAmdNoSourceMaps(options) {
  return babelDeps({
    babel: {
      compact: false,
      resolveModuleSource: function(source, filename) {
        return source[0] === '.' ? source : getAmdModuleId(renameWithoutJsExt(source, filename), options);
      },
      plugins: [babelPluginAmd],
      presets: options.babelPresets,
      sourceMaps: options.sourceMaps
    },
    cache: options.cacheNamespace,
    resolveModuleToPath: function(moduleName, filename) {
      var modulePath = modulesToPath[moduleName] ? modulesToPath[moduleName] : renameWithoutJsExt(moduleName, filename);
      return modulePath + '.js';
    },
    skipCachedFiles: true
  });
}

var modulesToPath = {};
function getAmdModuleId(source, options) {
	var result;
	var hasModulePrefix = false;
	if (source.substr(0, 7) === 'module:') {
		result = source.substr(7);
		hasModulePrefix = true;
  } else {
    var nodeFolder = 'node_modules' + path.sep;
    var index = source.lastIndexOf(nodeFolder);
    if (index !== -1) {
      result = source.substr(index + nodeFolder.length);
    } else {
      result = path.join(options.moduleName, path.relative(options.base, source));
    }
	}
	result = result.replace(/\\/g, '/');

	if (!hasModulePrefix) {
		modulesToPath[result] = source;
	}
	return result;
}

function renameWithoutJsExt(source, filename) {
	var renamed = babelPresetMetal.resolveModuleSource(source, filename);
	if (renamed[0] === '.') {
		renamed = path.resolve(path.dirname(filename), renamed);
	}
	if (renamed.substr(renamed.length - 3) === '.js') {
		renamed = renamed.substr(0, renamed.length - 3);
	}
	return renamed;
}

function updatePath(options) {
  return through.obj(function(file, enconding, callback) {
    file.path = path.join(file.base, getAmdModuleId(file.path, options));
    this.push(file); // jshint ignore:line
	  callback();
  });
}
