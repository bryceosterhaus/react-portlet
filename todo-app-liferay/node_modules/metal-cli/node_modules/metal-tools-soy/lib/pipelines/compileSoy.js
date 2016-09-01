'use strict';

var child_process = require('child_process');
var combiner = require('stream-combiner');
var defaultOptions = require('../options');
var expand = require('glob-expand');
var fs = require('fs');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var ignore = require('gulp-ignore');
var merge = require('merge');
var path = require('path');
var replace = require('gulp-replace');
var soyparser = require('soyparser');
var through = require('through2');
var wrapper = require('gulp-wrapper');

var PATH_TO_JAR = require.resolve('closure-templates-incrementaldom/SoyToIncrementalDomSrcCompiler.jar');

var parsedSoys = {};
var templateData = {};

module.exports = function(options) {
	options = merge({}, defaultOptions, options);

	parsedSoys = {};
	templateData = {};

	return combiner(
		gulpif(!options.skipMetalGeneration, extractParams()),
		compileToIncDom(options),
		ignore.exclude('*.soy'),
		// Changes compiled soy files to use return value of `goog.require`, so we
		// don't need to have `soy` be a global variable.
		gulpif(!options.skipMetalGeneration, replace('goog.require(\'soy\')', 'var soy = goog.require(\'soy\')')),
		gulpif(!options.skipMetalGeneration, replace('goog.require(\'soydata\')', 'var soydata = goog.require(\'soydata\')')),
		gulpif(!options.skipMetalGeneration, wrapper({
			header: getHeaderContent,
			footer: getFooterContent
		})),
		gulpif(!options.skipMetalGeneration, replaceTemplateRequires())
	);
};

function addTemplateParam(soyJsPath, templateName, param) {
	templateData[soyJsPath][templateName].params.push(param);
}

function compileToIncDom(options) {
	var files = [];
	return through.obj(
		function(file, encoding, callback) {
			files.push(file);
			callback();
		},
		function(callback) {
			if (files.length === 0) {
				this.emit('end');
				callback();
				return;
			}

			var stream = this;
			var outputDir = '/tmp/metal-tools-soy';
			var args = [
				'-jar',
				PATH_TO_JAR,
				'--outputPathFormat',
				path.join(outputDir, '{INPUT_DIRECTORY}{INPUT_FILE_NAME}.js')
			].concat(files.map(function(singleFile) {
				return path.relative(process.cwd(), singleFile.path);
			}));

			if (options.soyDeps) {
				var expanded = expand(options.soyDeps);
				for (var i = 0; i < expanded.length; i++) {
					args.push('--deps', expanded[i]);
				}
			}

			var cp = child_process.spawn('java', args, {cwd: process.cwd()});
			var stderr = '';
			cp.stderr.on('data', function(data) {
				stderr += data;
			});
			cp.on('exit', function(code) {
				if (code === 0) {
					for (var i = 0; i < files.length; i++) {
						var realPath = path.join(outputDir, path.relative(process.cwd(), files[i].path) + '.js');
						var compiled = new gutil.File({
							base: files[i].base,
							contents: fs.readFileSync(realPath),
							cwd: files[i].cwd,
							path: files[i].path + '.js'
						});
						stream.emit('data', compiled);
					}
				} else {
					stream.emit(
						'error',
						new gutil.PluginError('metal-tools-soy', 'Compile error:\n' + stderr)
					);
				}
				stream.emit('end');
				callback();
			});
		}
	);
}

function extractParams() {
	return through.obj(function(file, encoding, callback) {
		try {
			var soyJsPath = file.relative + '.js';
			var parsed = getParsedSoy(soyJsPath, file.contents);

			templateData[soyJsPath] = {};
			parsed.templates.forEach(function(cmd) {
				if (cmd.deltemplate) {
					return;
				}

				var templateName = cmd.name;
				templateData[soyJsPath][templateName] = {params: [], types: {}};
				cmd.params.forEach(function(tag) {
					addTemplateParam(soyJsPath, templateName, tag.name);
					templateData[soyJsPath][templateName].types[tag.name] = tag.type;
				});
			});

			this.push(file);
		} catch (e) {
			this.emit('error', new gutil.PluginError('metal-tools-soy', e));
			this.emit('end');
		} finally {
			callback();
		}
	});
}

function getFilenameNoLocale(filename) {
	return filename.replace(/_[^.]+\.soy/, '.soy');
}

function getFooterContent(file) {
	var footer = '';
	var pathNoLocale = getFilenameNoLocale(file.relative);
	var fileData = templateData[pathNoLocale];
	for (var templateName in fileData) {
		if (fileData[templateName].params) {
			footer += '\nexports.' + templateName + '.params = ' + JSON.stringify(fileData[templateName].params) + ';';
			footer += '\nexports.' + templateName + '.types = ' + JSON.stringify(fileData[templateName].types) + ';';
		}
	}

	var namespace = getParsedSoy(pathNoLocale, file.contents).namespace;
	var componentName = getNameFromNamespace(namespace);
	footer += '\ntemplates = exports;\n' +
		'return exports;\n\n' +
		'});\n\n' +
		'class ' + componentName + ' extends Component {}\n' +
		'Soy.register(' + componentName + ', templates);\n' +
		'export default templates;\n' +
		'export { ' + componentName + ', templates };\n';
	return footer + '/* jshint ignore:end */\n';
}

function getHeaderContent() {
	return '/* jshint ignore:start */\n' +
		'import Component from \'metal-component/src/Component\';\n' +
		'import Soy from \'metal-soy/src/Soy\';\n' +
		'var templates;\n' +
		'goog.loadModule(function(exports) {\n\n';
}

function getNameFromNamespace(namespace) {
	var parts = namespace.split('.');
	return parts[parts.length - 1];
}

function getParsedSoy(soyJsPath, contents) {
	if (!parsedSoys[soyJsPath]) {
		parsedSoys[soyJsPath] = soyparser(contents);
	}
	return parsedSoys[soyJsPath];
}

function replaceTemplateRequires() {
	return through.obj(function(file, encoding, callback) {
		var contents = file.contents.toString();

		var importMap = {};
		var requireRegex = /var\s+\$import(\d*)\s*=\s*goog\.require\('(\w+)\.incrementaldom'\);/g;
		contents = contents.replace(requireRegex, function(match, id, name) {
			importMap[id] = name;
			return '';
		});

		var importRegex = /\$import(\d*)\.(\w+)/g;
		contents = contents.replace(importRegex, function(match, id, methodName) {
			return 'Soy.getTemplate(\'' + importMap[id] + '.incrementaldom\', \'' + methodName + '\')';
		});

		file.contents = new Buffer(contents);
		this.emit('data', file);
		callback();
	});
}
