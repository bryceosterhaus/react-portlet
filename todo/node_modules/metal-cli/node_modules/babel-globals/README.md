babel-globals
===================================

Compiles javascript files and all their dependencies with babel, outputing them as global variables.

##Usage
This is a wrapper around [babel](https://npmjs.com/package/babel-core) for compiling a list of files and exposing the ES6 modules as global variables. After compiling all given files (and their dependencies, since we're using [babel-deps](https://npmjs.com/package/babel-deps)), they are bundled into a single file. The return value of the function is an instance of [Concat](https://www.npmjs.com/package/concat-with-sourcemaps).

```javascript
var babelGlobals = require('babel-globals');

var files = [
	{
		contents: fs.readFileSync(path1, 'utf8'),
		options: {filename: path1}
	},
	{
		contents: fs.readFileSync(path2, 'utf8'),
		options: {filename: path2}
	}
];

var bundle = babelGlobals(files, {
	bundleFileName: 'bundle.js',
	globalName: 'foo'
});
// Bundle will contain all the modules, which will be available at this.foo
```

## Babel 6

Note that since **babel-globals** is not using [Babel 6](http://babeljs.io/blog/2015/10/29/6.0.0/), it won't transpile ES2015 automatically anymore. To do that it's necessary to pass plugins or presets to babel, indicating what it should do.

For example, to use babel-globals on an ES2015 project you should have something like this:

```javascript
var bundle = babelGlobals(files, {
  babel: {
    presets: ['es2015']
  },
  bundleFileName: 'bundle.js',
  globalName: 'foo'
});
```

Note that you need to first install the preset to use it, like this:

```sh
$ npm install --save-dev babel-preset-es2015
```

## API

### files
An array of files to be compiled with their dependencies. Each element of the array should be an object with the following keys:

- `contents` **{string}** The code to be compiled.
- `options` **{!Object}** Options to be passed to babel when compiling this file. Note that the filename option is required.

### options

An object with the following options:

- `babel` **{Object=}** An object with babel options that should be used for all files. File specific options will be merged with this before the file is compiled, so they have higher priority.
- `bundleFileName` **{string=}** The name of the bundled file. Defaults to *bundle.js*.
- `globalName` **{string=}** The name of the global variable the modules will be exported to. Defaults to *myGlobals*.
- `skipGlobalVarInit` **{boolean=}** If true, will not initialize the global variable. Set this to true if the variable will be initialized somewhere else.
