'use strict';

var Command = require('../../Command');
var commandOptions = require('./options');
var metalToolsSoy = require('metal-tools-soy');

Command.register({
  desc: 'Compiles soy files to be Metal components',

  name: 'soy',

  run: function(options, callback) {
    metalToolsSoy(options).on('end', callback);
  },

  yargs: function(yargs) {
    return yargs
      .options(commandOptions)
      .help('help')
      .argv;
  }
});
