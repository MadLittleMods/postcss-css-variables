var gulp = require('gulp');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

var runSequence = require('run-sequence');
var del = require('del');

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
				'cursor-hand': require('./postcss-mixins/cursor-hand'),
				'toggle-checkbox-enclosed': require('./postcss-mixins/toggle-checkbox-enclosed')
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


// Clears the distribution folder before running the other tasks
gulp.task('build-finish', function(done) {
	var commandString = '';
	if(config.isDev) {
		commandString = 'iojs ./node_modules/jspm/jspm.js unbundle';
	}
	else {
		commandString = 'iojs ./node_modules/jspm/jspm.js bundle build/js/main --inject';
	}


	exec(commandString, function(error, stdout, stderr) {
		console.log(stdout);
		if(error) {
			console.log(error, stderr);
		}

		done();
	});
});


gulp.task('watch', function(){
	gulp.watch(config.paths.js, ['jsx']);
	gulp.watch(config.paths.postcss, ['postcss']);
});

// Default Task
gulp.task('default', function(callback) {
	runSequence(
		['build-clean'],
		['jsx', 'postcss', 'build-finish', 'watch'],
		callback
	);
});