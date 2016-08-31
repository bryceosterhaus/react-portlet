#!/usr/bin/env node

var path = require('path');
var ConfigGeneraror = require(path.join(__dirname, '../lib/config-generator'));
var pkg = require(path.join(__dirname, '../package.json'));
var program = require('commander');
var updateNotifier = require('update-notifier');

updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
}).notify();

function parseList(value) {
    return value.split(',').map(String);
}

program
    .usage('[options] <file ...>', parseList)
    .option('-b, --base [file name]', 'Already existing template to be used as base for the parsed configuration')
    .option('-c, --config [config variable]', 'The configuration variable to which the modules should be added. Default: __CONFIG__', String, '__CONFIG__')
    .option('-e, --extension [module extension]', 'Use the provided string as an extension instead to get it automatically from the file name. Default: ""', String, '')
    .option('-f, --format [module format]', 'Regex and value which will be applied to the file name when generating the module name. Example: "/_/g,-". Default: ""', parseList)
    .option('-i, --ignorePath [ignore path]', 'Do not create module path and fullPath properties.')
    .option('-k, --keepExtension [keep file extension]', 'If true, will keep the file extension when it generates module name. Default: false')
    .option('-l, --lowerCase [lower case]', 'Convert file name to lower case before to use it as module name. Default: false')
    .option('-m, --moduleConfig [module configuration]', 'JSON file which contains configuration data for the modules, for example module prefix', String, 'bower.json')
    .option('-o, --output [file name]', 'Output file to store the generated configuration')
    .option('-p, --filePattern [file pattern]', 'The pattern to be used in order to find files for processing. Default: "**/*.js"', String, '**/*.js')
    .option('-r, --moduleRoot [module root]', 'The folder which will be used as starting point from which the module name should be generated. Default: current working directory', String, process.cwd())
    .option('-s, --skipFileOverride [skip file override]', 'Do not overwrite module file if name is auto generated.')
    .version(require('../package.json').version)
    .parse(process.argv);

var configGenerator = new ConfigGeneraror(program);

configGenerator.process();