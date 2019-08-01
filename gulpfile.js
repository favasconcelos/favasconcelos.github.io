const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gSass = require('gulp-sass');
const gWebserver = require('gulp-webserver');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const opn = require('opn');
const del = require('del');

const bowerDir = 'bower_components/';

const sourcePaths = {
  css: ['scss/**/*.scss'],
  bower: {
    js: [
      bowerDir + 'jquery/dist/jquery.min.js',
      bowerDir + 'bootstrap/dist/js/bootstrap.min.js',
      bowerDir + 'wow/dist/wow.min.js'
    ],
    css: [
      bowerDir + 'bootstrap/dist/css/bootstrap.min.css',
      bowerDir + 'bootstrap/dist/css/bootstrap-theme.min.css',
      bowerDir + 'wow/css/libs/animate.css',
      bowerDir + 'font-awesome/css/font-awesome.min.css'
    ],
    fonts: [bowerDir + 'font-awesome/fonts/*']
  }
};

const distPaths = {
  css: 'css',
  vendor: {
    js: 'vendor/js/',
    css: 'vendor/css/',
    fonts: 'vendor/fonts/'
  }
};

const server = {
  host: 'localhost',
  port: '8080'
};

function sass(cb) {
  gulp.src(sourcePaths.css)
    .pipe(plumber())
    .pipe(gSass())
    .pipe(gulp.dest(distPaths.css));
  cb();
}

function webserver(cb) {
  gulp.src('.')
    .pipe(gWebserver({
      host: server.host,
      port: server.port,
      livereload: true,
      directoryListing: false
    }));
  cb();
}

function openbrowser(cb) {
  opn('http://' + server.host + ':' + server.port);
  cb();
}

function watch(cb) {
  gulp.watch(sourcePaths.css, sass);
  cb();
}

// CLEAR TASKS

function clearJS(cb) {
  del([distPaths.vendor.js]);
  cb();
}


function clearCSS(cb) {
  del([distPaths.vendor.css]);
  cb();
}

function clearFonts(cb) {
  del([distPaths.vendor.fonts]);
  cb();
}

// VENDOR TASKS

function vendor(cb) {
  gulp.series(vendorJS, vendorCSS, vendorFonts);
  cb();
}

function vendorFonts(cb) {
  gulp.series(clearFonts, function (callback) {
    gulp.src(sourcePaths.bower.fonts)
      .pipe(gulp.dest(distPaths.vendor.fonts));
    callback();
  });
  cb();
}

function vendorCSS(cb) {
  gulp.series(clearCSS, function (callback) {
    gulp.src(sourcePaths.bower.css)
      .pipe(gulp.dest(distPaths.vendor.css));
    callback();
  });
  cb();
}

function vendorJS(cb) {
  gulp.series(clearJS, function (callback) {
    gulp.src(sourcePaths.bower.js)
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(rename('vendor.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(distPaths.vendor.js));
    callback();
  });
  cb();
}

function build(cb) {
  gulp.series(sass, vendor);
  cb();
}

exports.default = gulp.series(build, webserver, watch, openbrowser);

// gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);