'use strict';

var resolve = require('resolve');

module.exports = function(module) {
  try {
    return require.resolve(module);
  } catch (e) {
    return resolve.sync(module, {basedir: process.cwd()});
  }
};
