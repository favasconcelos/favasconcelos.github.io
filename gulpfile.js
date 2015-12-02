var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
	gulp.src('.').pipe(webserver({
		fallback: 'index.html',
		open: true,
		livereload: {
			enable: true,
			filter: function(fileName) {
				if (fileName.match(/.map$/)) { // exclude all source maps from livereload 
					return false;
				} else {
					return true;
				}
			}
		}
	}));
});

gulp.task('default', ['webserver']);