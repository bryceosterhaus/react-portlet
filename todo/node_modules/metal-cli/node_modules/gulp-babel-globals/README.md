gulp-babel-globals
===================================

Gulp plugin for [babel-globals](https://npmjs.com/package/babel-globals).

##Usage

```javascript
var gulp = require('gulp');
var babelGlobals = require('gulp-babel-globals');

gulp.task('rename', function() {
	gulp.src('src/*.js')
		.pipe(babelGlobals({bundleFileName: 'myBundle.js'}))
		.pipe(gulp.dest('build'));
});
```

## API

### options
The options that gulp-babel-globals receives are the same ones accepted by [babel-globals](https://npmjs.com/package/babel-globals).
