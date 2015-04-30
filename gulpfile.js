var gulp = require('gulp');

gulp.task('test', function () {
	var mocha = require('gulp-mocha');
	return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('default', ['test']);
