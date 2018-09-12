'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const babelmin = require('gulp-babel-minify');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');

/* TODOS
======================== */

// Add browser syncing
// Add error handling


/* Linters
======================== */

gulp.task('lint-scss', function() {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(stylelint({
			syntax: 'scss',
			configFile: '.stylelintrc.json',
			reporters: [
				{ formatter: 'string', console: true }
			]
		}));
});

gulp.task('lint-js', function() {
	return gulp.src('dev/js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format());
});

/* Image Compressor
======================== */

gulp.task('compress-img', function() {
	return gulp.src('dev/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});


/* Compilers
======================== */

gulp.task('compile-css', function() {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('compile-js', function() {
	return gulp.src('dev/js/**/*.js')
		.pipe(babel())
    .pipe(babelmin())
		.pipe(gulp.dest('dist/js'));
});


/* Chains
======================== */

gulp.task('linters', gulp.parallel('lint-scss', 'lint-js'));
gulp.task('compilers', gulp.parallel('compile-css', 'compile-js'));
gulp.task('default', gulp.series('linters', 'compress-img', 'compilers'));
