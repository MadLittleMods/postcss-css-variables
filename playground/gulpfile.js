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

var cache = require('gulp-cached');
var react = require('gulp-react');

var corepostcss = require('postcss');
var postcss = require('gulp-postcss');
var inlineComments = require('postcss-inline-comment');
var mixins = require('postcss-mixins');
var nestedcss = require('postcss-nested');
var cssvariables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer-core');



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


// JSX
gulp.task('jsx', function() {
	return gulp.src(config.paths.js)
		// Process only changed files
		.pipe(cache('jsx')) 
		.pipe(react({
			es6module: true
		}))
		.pipe(gulp.dest('build/js'));
});



// Compile our PostCSS
gulp.task('postcss', function () {
	var processors = [
		inlineComments(),
		mixins({
			mixins: {
				'cursor-hand': require('./custom-postcss-mixins/cursor-hand'),
				'toggle-checkbox-enclosed': require('./custom-postcss-mixins/toggle-checkbox-enclosed')
			}
		}),
		nestedcss,
		cssvariables(),
		autoprefixer({browsers: ['last 10 versions']})
	];
	return gulp.src(config.paths.postcss)
		// Process only changed files
		.pipe(cache('jsx')) 
		.pipe(postcss(processors))
		.on('error', function (e) {
			console.log(e);
		})
		.pipe(gulp.dest('./build/css'));
});


// Read caniuse-db json and generate a map to paste into the System.js map config.js
gulp.task('generate-caniuse-db-json-systemjs-paths', function(done) {

	var jsonFileMap = {};

	var jsonGlobPatternString = 'jspm_packages/npm/caniuse-db@1.0.30000157/**/*.json';
	var jsonBaseGlobPath = glob2base(new glob.Glob(jsonGlobPatternString));

	glob(jsonGlobPatternString, {})
		.then(function(completeFilePaths) {
			completeFilePaths.forEach(function(completeFilePath) {
				var filePath = path.join(
						'caniuse-db@1.0.30000157/',
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
gulp.task('build-finish', function(done) {

	if(config.isDev) {
		jspm.unbundle()
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


gulp.task('watch', function(){
	//gulp.watch(config.paths.js, ['jsx']);
	//gulp.watch(config.paths.postcss, ['postcss']);
});

// Default Task
gulp.task('default', function(callback) {
	runSequence(
		['build-clean'],
		['build-finish', 'watch'],
		callback
	);
});