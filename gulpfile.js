var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var mainBowerFiles = require('main-bower-files');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('scss', function() {
	return gulp.src('_template/css/scss/main.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('_template/css'));
});

gulp.task('jade', function() {
	return gulp.src('_template/templates/pages/*.jade')
		.pipe(jade({
			pretty: false
		}))
		.pipe(gulp.dest('_template'));
})

gulp.task('jsLibs', function () {
    return gulp.src(mainBowerFiles({
  		filter:'**/*.js',
    	paths: {
        	bowerDirectory: 'bower_components',
        	bowerJson: 'bower.json'
    	}
	}))
	.pipe(concat('vendor.js'))
	.pipe(minify({noSource: true}))
	.pipe(gulp.dest('_template/js/vendor'));
});

gulp.task('default', function() {
	gulp.watch('_template/css/scss/*.scss', ['scss']);
	gulp.watch('_template/templates/**/*.jade', ['jade']);
	gulp.watch('bower.json',['jsLibs']);
});
