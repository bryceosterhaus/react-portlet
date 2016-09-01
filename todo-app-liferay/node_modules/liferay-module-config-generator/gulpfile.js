'use strict';

var istanbul = require('gulp-istanbul');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function(done) {
    gulp.src(['lib/config-generator.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/**/*.js', '!test/modal/**/*.js', '!test/expected/**/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .on('end', done);
            });
});

gulp.task('test:no-coverage', function() {
    return gulp.src(['lib/config-generator.js',
        'test/**/*.js', '!test/modal/**/*.js', '!test/expected/**/*.js'])
            .pipe(mocha());
});

gulp.task('test-watch', function() {
    gulp.watch('tests/js/**/*.js', ['test']);
});