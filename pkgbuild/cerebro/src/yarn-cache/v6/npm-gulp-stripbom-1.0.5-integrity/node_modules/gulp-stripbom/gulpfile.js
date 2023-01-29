'use strict'

var gulp = require('gulp');
var stripBom = require('./');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

//test buffer
gulp.task('default', function(){

	return gulp.src('1.txt')
			.pipe(stripBom({ext: ['txt', 'php']}))
			.pipe(gulp.dest('dest-buffer'));
});

//test stream
gulp.task('test-stream', function(){
	return gulp.src('1.txt', {buffer: false})
			.pipe(stripBom())
			.pipe(gulp.dest('dest-stream'));
});

gulp.task('hint', function(){
	return gulp.src('./index.js')
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
});