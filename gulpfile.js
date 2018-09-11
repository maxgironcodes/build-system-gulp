'use strict';

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

/* Linters
======================== */
gulp.task('lint-js', function() {
	return gulp.src('dev/js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('lint-scss', function() {
	return gulp.src('dev/scss/**/*.scss')
		.pipe();
});

/* Compilers
======================== */
gulp.task('compile-js', function() {
	return gulp.src('dev/js/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/js'));
});

// Default
gulp.task('default', gulp.series('lint-js', 'compile-js'));
