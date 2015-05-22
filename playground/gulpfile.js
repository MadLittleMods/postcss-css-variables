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
	paths: {
		'js': ['src/js/**/*.js'],
		'postcss': ['src/postcss/**/*.css']
	}
};

// `gulp --dev`
// When the `dev` flag is added
if(gutil.env.dev === true) {
	// Can be used with `gulp-if`
	config.isDev = true;
}



// Clears the distribution folder before running the other tasks
gulp.task('build-clean', function(done) {
	del(['./dist'], done);
});




// Read caniuse-db json and generate a map to paste into the System.js map config.js
gulp.task('generate-caniuse-db-json-systemjs-paths', function(done) {

	var jsonFileMap = {};

	var jsonGlobPatternString = 'jspm_packages/npm/caniuse-db@1.0.30000161/**/*.json';
	var jsonBaseGlobPath = glob2base(new glob.Glob(jsonGlobPatternString));

	glob(jsonGlobPatternString, {})
		.then(function(completeFilePaths) {
			completeFilePaths.forEach(function(completeFilePath) {
				var filePath = path.join(
						'caniuse-db@1.0.30000161/',
						path.relative(jsonBaseGlobPath, completeFilePath)
					)
					.replace(/\\/g, '/');

				var fileKey = path.join(
						'caniuse-db/',
						path.dirname(path.relative(jsonBaseGlobPath, completeFilePath)),
						path.basename(filePath, '.json')
					)
					.replace(/\\/g, '/');

				jsonFileMap[fileKey] = 'npm:' + filePath + '!';
			});
		})
		.then(function() {
			var output = JSON.stringify(jsonFileMap, null, '\t');

			return fs.outputFile('./caniuse-db-json-systemjs-paths.json', output);

		})
		.then(function() {
			done();
		});

});



// Clears the distribution folder before running the other tasks
gulp.task('build-setup', function(done) {

	if(config.isDev) {
		var pkg = require('./package.json');
		var deps = pkg.jspm.dependencies;
		var modules = Object.keys(deps);
		var moduleList = modules.join(' + ');
		console.log('\n' + moduleList + '\n');

		Promise.join(
			jspm.unbundle(),
			// Thanks to @OrKoN for this incremental jspm bundle
			jspm.bundle(moduleList, 'jspm-bundle.js', { mangle: false, sourceMaps: true, inject: true })
		)
		.then(function() {
			done();
		});

	}
	else {
		jspm.setPackagePath('.');
		jspm.bundle(
			'src/js/main', 
			'build.js',
			{
				mangle: false,
				sourceMaps: true,
				inject: true
			}
		)
		.then(function() {
			done();
		});
	}

	/* * /
	var commandString = '';
	if(config.isDev) {
		commandString = 'iojs ./node_modules/jspm/jspm.js unbundle';
	}
	else {
		commandString = 'iojs ./node_modules/jspm/jspm.js bundle src/js/main --inject';
	}


	exec(commandString, function(error, stdout, stderr) {
		console.log(stdout);
		if(error) {
			console.log(error, stderr);
		}

		done();
	});
	/* */
});


// Default Task
gulp.task('default', function(callback) {
	runSequence(
		['build-clean'],
		['build-setup'],
		callback
	);
});