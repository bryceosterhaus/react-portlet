babel-deps
===================================

Compiles javascript files and all their dependencies with babel.

## Usage
This tool uses [babel](npmjs.com/package/babel-core) to compile a list of files. The main difference from just using babel directly is that this will automatically load and compile any files that weren't given in the input list but are imported as dependencies. The results contain all compiled files, including the extra dependencies.

```javascript
	var files = [
		{
			contents: fs.readFileSync(path1, 'utf8'),
			options: {filename: path1}
		},
		{
			contents: fs.readFileSync(path1, 'utf8'),
			options: {filename: path1}
		}
	];
	var results = babelDeps(files, options);
```

## API

### files

An array of files to be compiled with their dependencies. Each element of the array should be an object with the following keys:

- `contents` **{string}** The code to be compiled.
- `options` **{!Object}** Options to be passed to babel when compiling this file. Note that the filename option is required.

### options

The options object can have the following keys (all optional):

- `babel` **(Object)** An object with babel options that should be used for all files. File specific options will be merged with this before the file is compiled, so they have higher priority.
- `cache` **(boolean)** A flag indicating if the compiled results for dependencies should be cached in memory and reused on later calls. This is useful when the contents of dependency files aren't expected to change, speeding up the results.
- `resolveModuleToPath` **(function(string, string))** Function that should be called to convert a dependency module source to its path, so it can be fetched. If this is not given, a default function will assume that the module sources already are valid paths.
- `skipCachedFiles` **{boolean}** A flag indicating if files that cause a cache hit should be skipped when returning the results. Only used when `cache` is set to true.
