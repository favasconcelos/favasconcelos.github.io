var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn = require('opn');

var bowerDir = 'bower_components/';

var bowerFiles = {
	js : [
	bowerDir+'bootstrap/dist/js/bootstrap.min.js', 
	bowerDir+'jquery/dist/jquery.min.js', 
	bowerDir+'wow/dist/wow.min.js'
	],
	styles: [
	bowerDir+'bootstrap/dist/css/bootstrap.min.css', 
	bowerDir+'bootstrap/dist/css/bootstrap-theme.min.css', 
	bowerDir+'wow/css/libs/animate.css',
	bowerDir+'font-awesome/css/font-awesome.min.css',
	],
	fonts: [bowerDir+'font-awesome/fonts/*']
};

var sourcePaths = {
	styles: ['scss/**/*.scss']
};

var distPaths = {
	styles: 'css',
	vendor: {
		js: 'vendor/js',
		styles: 'vendor/styles',
		fonts: 'vendor/fonts'
	}
};

var server = {
	host: '172.24.8.131',
	port: '8080'
};

gulp.task('sass', function() {
	gulp.src(sourcePaths.styles)
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(distPaths.styles));
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
	gulp.watch(sourcePaths.styles, ['sass']);
});

gulp.task('bower', function() {
	gulp.src(bowerFiles.js)
	.pipe(gulp.dest(distPaths.vendor.js));

	gulp.src(bowerFiles.styles)
	.pipe(gulp.dest(distPaths.vendor.styles));

	gulp.src(bowerFiles.fonts)
	.pipe(gulp.dest(distPaths.vendor.fonts));
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'bower', 'webserver', 'watch', 'openbrowser']);