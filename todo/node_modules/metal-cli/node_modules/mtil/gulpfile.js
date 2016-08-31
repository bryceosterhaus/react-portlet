'use strict';

var gulp = require('gulp'),
	paths = {
		gulp: 'gulpfile.js',
		src: '{array,function,object,promise}/**/*.js',
		test: 'test/**/*Spec.js',
		bench: 'test/**/*Bench.js',
		pkg: '*.json'
	};

gulp.task('default', ['lint', 'test']);

gulp.task('lint', function () {
	var jscs = require('gulp-jscs'),
		jshint = require('gulp-jshint'),
		plumber = require('gulp-plumber');

	return gulp
		.src([paths.gulp, paths.src, paths.test])
		.pipe(plumber())
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('cover', function () {
	var istanbul = require('gulp-istanbul');

	return gulp
		.src(paths.src)
		.pipe(istanbul());
});

gulp.task('test', ['cover'], function () {
	var istanbul = require('gulp-istanbul'),
		mocha = require('gulp-mocha');

	return gulp
		.src(paths.test)
		.pipe(mocha({ reporter: 'spec' }))
		.pipe(istanbul.writeReports());
});

gulp.task('bench', function () {
	var mocha = require('gulp-mocha');

	return gulp
		.src(paths.bench)
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('watch', function () {
	var lr = require('gulp-livereload'),
		watch = require('gulp-watch');

	watch({ glob: [paths.src, paths.test] }).pipe(lr());
});

gulp.task('bump', function () {
	var bump = require('gulp-bump');

	return gulp
		.src(paths.pkg)
		.pipe(bump())
		.pipe(gulp.dest('./'));
});
