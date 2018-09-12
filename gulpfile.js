'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const babelmin = require('gulp-babel-minify');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();

/* TODOS
======================== */

// Add browser syncing
// Add error handling


/* Lint
======================== */

gulp.task('lint-css', function() {
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


/* Compress Images
======================== */

gulp.task('compress-img', function() {
	return gulp.src('dev/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});


/* Compile
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


/* Serve
======================== */

gulp.task('browser-sync', function() {
  browseSync({
    server: {
      baseDir: 'dev'
    }
  });
});


/* Watch
======================== */

gulp.task('watch-css', function() {
  gulp.watch('dev/scss/**/*.scss', gulp.series('compile-css'));
});

gulp.task('watch-js', function() {
  gulp.watch('dev/js/**/*.js', gulp.series('compile-js'));
});


/* Chains
======================== */

gulp.task('lint', gulp.parallel('lint-css', 'lint-js'));
gulp.task('compile', gulp.parallel('compile-css', 'compile-js'));
gulp.task('watch', gulp.parallel('watch-css', 'watch-js'));
gulp.task('default', gulp.series('lint', 'compress-img', 'compile'));
