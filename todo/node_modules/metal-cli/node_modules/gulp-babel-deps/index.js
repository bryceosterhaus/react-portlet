'use strict';

var babelDeps = require('babel-deps');
var gutil = require('gulp-util');
var sourceMap  = require('vinyl-sourcemaps-apply');
var through = require('through2');

module.exports = function(options) {
  var files = [];
  var basePath;
  function receiveFile(file, encoding, callback) {
    basePath = file.base;
    files.push({
      contents: file.contents.toString(encoding),
      options: {filename: file.path}
    });
    callback();
  }

  function compile(callback) {
    try {
      var results = babelDeps(files, options);
      for (var i = 0; i < results.length; i++) {
        var file = new gutil.File({
          base: basePath,
          contents: new Buffer(results[i].babel.code),
          path: results[i].path
        });
        file.babel = results[i].babel.metadata;
        if (results[i].babel.map) {
          sourceMap(file, results[i].babel.map);
        }
        this.push(file); // jshint ignore:line
      }
      callback();
    } catch (error) {
      this.emit('error', error);
      callback();
      return;
    }
  }

  return through.obj(receiveFile, compile);
};

module.exports.clearCache = babelDeps.clearCache;
