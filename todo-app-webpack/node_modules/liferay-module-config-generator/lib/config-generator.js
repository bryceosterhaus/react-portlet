'use strict';

var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
var jsstana = require('jsstana');
var minimatch = require('minimatch');
var path = require('path');
var Promise = require('bluebird');
var recast = require('recast');
var sourceMap = require('source-map');
var upath = require('upath');
var walk = require('walk');

Promise.promisifyAll(fs);

var builders = recast.types.builders;
var REGEX_SOURCEMAP = /\/\/#\s+sourceMappingURL\s*=(.+)/;

/**
 * ConfigGeneraror implementation
 * @class ConfigGeneraror
 * @param {Object} options Configuration options
 */
function ConfigGeneraror(options) {
    this._options = options;
}

ConfigGeneraror.prototype = {
    constructor: ConfigGeneraror,

    /**
     * Processes the passed files or folders and generates config file.
     *
     * @method process
     * @return {Promise} Returns Promise which will be resolved with the generated config file.
     */
    process: function() {
        var self = this;

        self._modules = [];

        return new Promise(function(resolve, reject) {
            var base;
            var processors = [];

            if (self._options.base) {
                base = fs.readFileSync(path.resolve(self._options.base), 'utf8');
            }

            // For every file or folder, create a promise,
            // parse the file, extract the config and store it
            // to the global modules array.
            // Once all files are being processed, store the generated config.
            for (var i = 0; i < self._options.args.length; i++) {
                var file = self._options.args[i];

                var fileStats = fs.statSync(file);

                if (fileStats.isDirectory(file)) {
                    var walker = walk.walk(file, {
                        followLinks: false
                    });

                    walker.on('file', self._onWalkerFile.bind(self));

                    processors.push(self._onWalkerEnd(walker));
                } else if (fileStats.isFile()) {
                    processors.push(self._processFile(file));
                }
            }

            Promise.all(processors)
                .then(function(uselessPromises) {
                    return self._generateConfig();
                })
                .then(function(config) {
                    var content;

                    if (self._options.config) {
                        if (base) {
                            content = base + self._options.config + '.modules = ' + JSON.stringify(config) + ';';
                        } else {
                            content = 'var ' + self._options.config + ' = {modules: ' + JSON.stringify(config) + '};';
                        }
                    } else {
                        content = JSON.stringify(config);
                    }

                    return self._saveConfig(beautify(content));
                })
                .then(function(config) {
                    resolve(config);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },

    /**
     * Extracts conditions from a module configuration.
     *
     * @method _extractCondition
     * @protected
     * @param {Object} ast AST to be processed
     * @return {Object} The extracted values for the conditional options
     */
    _extractCondition: function(ast) {
        var self = this;

        var found;
        var meta = ast;
        var values = {};

        jsstana.traverse(ast, function(node) {
            if (!found) {
                var match = jsstana.match('(ident META)', node);

                if (match) {
                    jsstana.traverse(meta, function(node) {
                        if (!found) {
                            match = jsstana.match('(return)', node) || jsstana.match('(object)', node);

                            if (match) {
                                values = self._extractObjectValues(['path', 'fullPath', 'condition', 'group'], node);

                                found = true;
                            }
                        }
                    });

                } else {
                    meta = node;
                }
            }
        });

        return values;
    },

    /**
     * Extract values for some idents (look in jsstana documentation) from an AST
     *
     * @method _extractObjectValues
     * @param {Arrat} idents The idents which values should be looked in the AST
     * @param {AST} ast The AST to be processed.
     * @return {Object} An object with the extracted values for all found idents
     */
    _extractObjectValues: function(idents, ast) {
        var self = this;

        var result = Object.create(null);
        var found;
        var ident;

        if (ast) {
            jsstana.traverse(ast, function(node) {
                if (found) {
                    found = false;

                    result[ident] = self._extractValue(node);
                }

                for (var i = 0; i < idents.length; i++) {
                    ident = idents[i];

                    if (jsstana.match('(ident ' + ident + ')', node)) {
                        found = true;

                        break;
                    }
                }
            });
        }

        return result;
    },

    /**
     * Extracts the value from a jsstana node. The value may be
     * Literal, ObjectExpression, ArrayExpression or FunctionExpression.
     *
     * @method _extractValue
     * @protected
     * @param {Object} node jsstana node which should be processed
     * @return {String} The extracted value from the node
     */
    _extractValue: function(node) {
        var self = this;

        var i;

        if (node.type === 'Literal') {
            return node.value;
        } else if (node.type === 'ObjectExpression') {
            var obj = {};

            for (i = 0; i < node.properties.length; i++) {
                var property = node.properties[i];

                obj[property.key.name] = self._extractValue(property.value);
            }

            return obj;
        } else if (node.type === 'ArrayExpression') {
            var arr = [];

            for (i = 0; i < node.elements.length; i++) {
                arr.push(self._extractValue(node.elements[i]));
            }

            return arr;

        } else if (node.type === 'FunctionExpression') {
            return recast.print(node, {
                wrapColumn: Number.Infinity
            }).code;
        }
    },

    /**
     * Generates a config object from all found modules
     *
     * @method _generateConfig
     * @protected
     * @return {Promise} Returns Promise which will be resolved with the generated configuration.
     */
    _generateConfig: function() {
        var self = this;

        return new Promise(function(resolve, reject) {
            var config = {};

            for (var i = 0; i < self._modules.length; i++) {
                var module = self._modules[i];

                var storedModule = config[module.name] = {
                    dependencies: module.dependencies
                };

                if (module.condition) {
                    storedModule.condition = module.condition;
                }

                if (!self._options.ignorePath) {
                    if (module.fullPath) {
                        storedModule.fullPath = upath.toUnix(module.fullPath);
                    } else {
                        var dirname = path.dirname(module.name);

                        var modulePath = module.path || (dirname !== '.' ? dirname + '/' + module.file : module.file);

                        storedModule.path = upath.toUnix(modulePath);
                    }
                }
            }

            resolve(config);
        });
    },

    /**
     * Generates a module name in case it is not present in the AMD definition.
     *
     * @method _generateModuleName
     * @protected
     * @param {String} file The file path to be processed and module name to be generated.
     * @return {String} The generated module name
     */
    _generateModuleName: function(file) {
        var self = this;

        var ext;

        if (!self._options.keepExtension) {
            ext = self._options.extension || path.extname(file);
        }

        var fileName = path.basename(file, ext);

        if (self._options.format) {
            var formatRegex = self._options.format[0].split('/');
            formatRegex = new RegExp(formatRegex[1], formatRegex[2]);

            var replaceValue = self._options.format[1];

            fileName = fileName.replace(formatRegex, replaceValue);
        }

        var moduleConfig = {
            name: '',
            version: '1.0.0'
        };

        if (self._options.moduleConfig) {
            var fileModuleConfig = path.resolve(self._options.moduleConfig);

            if (fs.existsSync(fileModuleConfig)) {
                moduleConfig = require(fileModuleConfig);
            }
        }

        fileName = path.join(path.dirname(file), fileName);

        var moduleName = '';

        if (moduleConfig.name) {
            moduleName = moduleConfig.name + '@' + moduleConfig.version;
        }

        moduleName = path.join(moduleName, fileName.substring(self._options.moduleRoot.length));

        if (self._options.lowerCase) {
            moduleName = moduleName.toLowerCase();
        }

        return upath.toUnix(moduleName);
    },

    /**
     * Retrieves the generated configuration for all found modules
     *
     * @method _getConfig
     * @protected
     * @param {String} file The file which should be processed
     * @param {Object} ast  The parsed AST of the file, which should be processed.
     * @return {Promise} Returns Promise which will be resolved with the generated configuration.
     */
    _getConfig: function(file, ast) {
        var self = this;

        return new Promise(function(resolve, reject) {
            var result = [];

            jsstana.traverse(ast, function(node) {
                var match = jsstana.match('(or (call define ?) (call define ? ?) (call define ? ? ?))', node);

                if (match) {
                    var dependencies;
                    var moduleName;

                    // If the module does not have a module id, nor dependencies, generate them.
                    if (node.arguments.length === 1) {
                        moduleName = self._generateModuleName(file);
                        dependencies = builders.arrayExpression(
                            [builders.literal('module'), builders.literal('exports')]
                        );

                        // Add the dependencies.
                        node.arguments.unshift(dependencies);

                        // Add the module name.
                        node.arguments.unshift(builders.literal(moduleName));

                        // Save the file back
                        if (!self._options.skipFileOverride) {
                            self._saveFile(file, ast);
                        }
                    } else if (node.arguments.length === 2) {
                        // If the first argument is the dependencies, just generate the module name
                        if (node.arguments[0].type === 'ArrayExpression') {
                            moduleName = self._generateModuleName(file);
                            dependencies = node.arguments[0];

                            // Add the module name.
                            node.arguments.unshift(builders.literal(moduleName));
                        } else {
                            // The first argument is a module name and the second one is the implementation.
                            // In this case we have to generate the dependencies and keep the module name.
                            moduleName = node.arguments[0].value;
                            dependencies = builders.arrayExpression(
                                [builders.literal('module'), builders.literal('exports')]
                            );

                            // Add the dependencies as a second argument and keep the module name as the first one.
                            node.arguments.splice(1, 0, dependencies);
                        }

                        // Save the file back
                        if (!self._options.skipFileOverride) {
                            self._saveFile(file, ast);
                        }
                    } else {
                        moduleName = node.arguments[0].value;
                        dependencies = node.arguments[1];
                    }

                    var config = {
                        file: path.basename(file),
                        name: moduleName,
                        dependencies: self._extractValue(dependencies)
                    };

                    var values = self._extractCondition(node);

                    Object.keys(values || {}).forEach(function(key) {
                        config[key] = values[key];
                    });

                    result.push(config);
                }
            });

            resolve(result);
        });
    },

    /**
     * Listener which will be invoked when a file whiting the provided folder is found
     *
     * @method _onWalkerFile
     * @protected
     * @param {String} root The root directory of the file
     * @param {Object} fileStats Object with data about the file
     * @param {Function} next A callback function to be called once the file is processed
     */
    _onWalkerFile: function(root, fileStats, next) {
        var self = this;

        var file = path.join(root, fileStats.name);

        if (minimatch(file, self._options.filePattern, {
            dot: true
        })) {
            self._processFile(file)
                .then(function(config) {
                    next();
                });
        } else {
            next();
        }
    },

    /**
     * Listener which will be invoked once the walker processes all files in the provided directory.
     *
     * @method _onWalkerEnd
     * @param {Object} walker The walker object
     * @return {Promise} Returns Promise which will be resolved with the root folder, file data and a "next" callback
     */
    _onWalkerEnd: function(walker) {
        return new Promise(function(resolve, reject) {
            walker.on('end', resolve);
        });
    },

    /**
     * Parses the content of a file
     *
     * @method _parseFile
     * @protected
     * @param {String} file The file which should be parsed
     * @param {String} content The content of the file which should be parsed
     * @return {Promise} Returns Promise which will be resolved with file's AST.
     */
    _parseFile: function(file, content) {
        return new Promise(function(resolve, reject) {
            var ast = recast.parse(content);

            resolve(ast);
        });
    },

    /**
     * Processes a file and generates configuration object for all modules found inside
     *
     * @method _processFile
     * @protected
     * @param {String} file The file which should be processed
     * @return {Promise} Returns Promise which will be resolved with the generated config.
     */
    _processFile: function(file) {
        var self = this;

        return new Promise(function(resolve) {
            fs.readFileAsync(file, 'utf-8')
                .then(function(content) {
                    return self._parseFile(file, content);
                })
                .then(function(ast) {
                    return self._getConfig(file, ast);
                })
                .then(function(config) {
                    self._modules = self._modules.concat(config);

                    resolve(config);
                });
        });
    },

    /**
     * Saves file with the reprinted AST and updated source map, if any.
     *
     * @method _saveFile
     * @protected
     * @param {String} file The file to save
     * @param {Object} ast The AST of the file
     */
    _saveFile: function(file, ast) {
        var content = recast.print(ast, {
            wrapColumn: Number.Infinity
        }).code;

        content = this._updateSourceMap(file, content);

        fs.writeFileSync(file, content);
    },

    /**
     * Saves the generated configuration file on the hard drive
     *
     * @method _saveConfig
     * @protected
     * @param {Object} config The configuration object to be saved
     * @return {Promise} Returns Promise which will be resolved with the generated config file
     */
    _saveConfig: function(config) {
        var self = this;

        return new Promise(function(resolve, reject) {
            if (self._options.output) {
                fs.writeFileAsync(self._options.output, config)
                    .then(function() {
                        resolve(config);
                    });
            } else {
                resolve(config);
            }
        });
    },

    /**
     * Updates the source and source map of the processed file.
     *
     * @method _updateSourceMap
     * @protected
     * @param {String} file The name of the processed file
     * @param {String} content The content of the processed file
     * @return {String} The modified content after updating the source map
     */
    _updateSourceMap: function(file, content) {
        var sourceMapURLMatch = REGEX_SOURCEMAP.exec(content);

        if (sourceMapURLMatch) {
            var sourceMapURL = sourceMapURLMatch[1];

            if (sourceMapURL) {
                var sourceMapContent = fs.readFileSync(path.resolve(path.dirname(file), sourceMapURL), 'utf-8');

                var consumer = new sourceMap.SourceMapConsumer(sourceMapContent);
                var node = sourceMap.SourceNode.fromStringWithSourceMap(content, consumer);

                var result = node.toStringWithSourceMap();

                content = result.code;

                var map = result.map;
                fs.writeFileSync(path.resolve(path.dirname(file), sourceMapURL), JSON.stringify(map));
            }
        }

        return content;
    }
};

module.exports = ConfigGeneraror;