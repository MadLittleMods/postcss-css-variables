var gulp = require('gulp');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

var Promise = require('bluebird');
//var fs = require('fs');
var fs = require('fs-extra');
Promise.promisifyAll(fs);
var path = require('path');
var glob = Promise.promisify(require('glob'));
var glob2base = require('glob2base');

var runSequence = require('run-sequence');
var del = require('del');

var jspm = require('jspm');



var config = {
	// `gulp --dev`
	isDev: gutil.env.dev === true
};


// Clears the distribution folder before running the other tasks
gulp.task('build-clean', function() {
	return del(['./dist', 'jspm-bundle.js', 'jspm-bundle.js.map', './build.js', './build.js.map']);
});



// Clears the distribution folder before running the other tasks
gulp.task('build-setup', function() {
	jspm.setPackagePath('.');
	var builder = new jspm.Builder();

	if(config.isDev) {
		var pkg = require('./package.json');
		var deps = pkg.jspm.dependencies;
		var modules = Object.keys(deps);
		var moduleList = modules.join(' + ');
		console.log('\n' + moduleList + '\n');

		return Promise.join(
			builder.unbundle(),
			// Thanks to @OrKoN for this incremental jspm bundle
			builder.bundle(moduleList, 'jspm-bundle.js', { mangle: false, sourceMaps: true, inject: true })
		)

	}
	else {
		return builder.bundle(
			'src/js/main.js',
			'build.js',
			{
				mangle: false,
				sourceMaps: true,
				inject: true
			}
		);
	}
});


// Default Task
gulp.task('default', function(callback) {
	runSequence(
		['build-clean'],
		['build-setup'],
		callback
	);
});
