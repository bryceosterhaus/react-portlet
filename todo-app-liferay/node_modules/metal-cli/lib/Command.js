'use strict';

var yargs = require('yargs');

yargs.demand(1, 1);
var commands = {};

var Command = {
  get: function() {
    return commands[Command.getName()];
  },

  getArgv: function() {
    return yargs.argv;
  },

  getName: function() {
    return Command.getArgv()._[0];
  },

  register: function(command) {
    commands[command.name] = command;
    yargs.command(command.name, command.desc, command.yargs);
  }
};

module.exports = Command;
