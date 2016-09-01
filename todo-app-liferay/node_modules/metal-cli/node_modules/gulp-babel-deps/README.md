# gulp-babel-deps

Gulp plugin for [babel-deps](https://npmjs.com/package/babel-deps).

## Usage

```javascript
var gulp = require('gulp');
var babelDeps = require('gulp-babel-deps');

gulp.task('build', function() {
  gulp.src('src/*.js')
    .pipe(babelDeps())
    .pipe(gulp.dest('build'));
});
```

## API

### options
The options that gulp-babel-deps receives are the same ones accepted by [babel-deps](https://npmjs.com/package/babel-deps).
