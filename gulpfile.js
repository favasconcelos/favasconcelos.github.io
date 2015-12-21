var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var opn = require('opn');
var del = require('del');

var bowerDir = 'bower_components/';

var sourcePaths = {
	css: ['scss/**/*.scss'],
	bower: {
		js : [
		bowerDir+'jquery/dist/jquery.min.js', 
		bowerDir+'bootstrap/dist/js/bootstrap.min.js', 
		bowerDir+'wow/dist/wow.min.js'
		],
		css: [
		bowerDir+'bootstrap/dist/css/bootstrap.min.css', 
		bowerDir+'bootstrap/dist/css/bootstrap-theme.min.css', 
		bowerDir+'wow/css/libs/animate.css',
		bowerDir+'font-awesome/css/font-awesome.min.css'
		],
		fonts: [bowerDir+'font-awesome/fonts/*']
	}
};

var distPaths = {
	css: 'css',
	vendor: {
		js: 'vendor/js/',
		css: 'vendor/css/',
		fonts: 'vendor/fonts/'
	}
};

var server = {
	host: 'localhost',
	port: '8080'
};

gulp.task('sass', function() {
	gulp.src(sourcePaths.css)
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(distPaths.css));
});

gulp.task('webserver', function() {
	gulp.src('.')
	.pipe(webserver({
		host: server.host,
		port: server.port,
		livereload: true,
		directoryListing: false
	}));
});

gulp.task('openbrowser', function() {
	opn('http://' + server.host + ':' + server.port);
});

gulp.task('watch', function() {
	gulp.watch(sourcePaths.css, ['sass']);
});

// CLEAR TASKS

gulp.task('clear:js', function(){
	return del([distPaths.vendor.js]);
});

gulp.task('clear:css', function(){
	return del([distPaths.vendor.css]);
});

gulp.task('clear:fonts', function(){
	return del([distPaths.vendor.fonts]);
});

// VENDOR TASKS

gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:fonts'], function(){});

gulp.task('vendor:fonts', ['clear:fonts'], function() {
	return gulp.src(sourcePaths.bower.fonts)
	.pipe(gulp.dest(distPaths.vendor.fonts));
});

gulp.task('vendor:css', ['clear:css'], function(){
	return gulp.src(sourcePaths.bower.css)
	.pipe(gulp.dest(distPaths.vendor.css));
});

gulp.task('vendor:js', ['clear:js'], function(){
	return gulp.src(sourcePaths.bower.js)
	.pipe(sourcemaps.init())
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(rename('vendor.min.js'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(distPaths.vendor.js));
});

gulp.task('build', ['sass', 'vendor']);

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);