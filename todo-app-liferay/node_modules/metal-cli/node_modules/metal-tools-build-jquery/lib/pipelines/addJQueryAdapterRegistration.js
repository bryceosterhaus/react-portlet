'use strict';

var path = require('path');
var wrapper = require('gulp-wrapper');

module.exports = function() {
	return wrapper({
		footer: function(file) {
			if (file.path.substr(file.path.length - 7) === '.soy.js') {
				return '';
			}
			var className = path.basename(file.path);
			className = className.substr(0, className.length - 3);
			var classNameLowerCase = className[0].toLowerCase() + className.substr(1);
			return 'import JQueryAdapter from \'metal-jquery-adapter/src/JQueryAdapter\';' +
				'JQueryAdapter.register(\'' + classNameLowerCase + '\', ' + className + ');';
		}
	});
};
