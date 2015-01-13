'use strict';

var gulp = require('gulp'),
    //rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    //sourcemaps = require('gulp-sourcemaps'),
    //ngAnnotate = require('gulp-ng-annotate'),
    //changed = require('gulp-changed'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    //jasmine = require('gulp-jasmine'),
    connect = require('gulp-connect');

var outputDir = 'builds/development',
    env = process.env.NODE_ENV || 'development';

gulp.task('jade', function() {
  return gulp.src('src/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  var config = {};

  if (env === 'production') {
    config.outputStyle = 'compressed';
  }

  if (env === 'development') {
      config.onError = function(e) { console.log(e); };
      config.sourceMap = 'sass';
      //config.sourceComments = 'map';
  }

  return gulp.src('src/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src([
      'src/js/**/*.js',
    ])
    .pipe(gulp.dest(outputDir+'/js/'))
    .pipe(connect.reload());
});

gulp.task('img', function() {
  return gulp.src([
      'src/i/**/*.png',
      'src/i/**/*.jpg',
      'src/i/**/*.gif'
    ])
    .pipe(gulp.dest(outputDir+'/i/'))
    .pipe(connect.reload());
});

gulp.task('compress:libs', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/lodash/dist/lodash.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outputDir + '/js'));
});

gulp.task('lint', function() {
    var files = [
      './src/js/**/*.js',
      '!./src/js/pixi.dev.js'
    ];
    files.push('./gulpfile.js');
    return gulp.src(files)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('src/js/**/*.js', ['js','lint']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    port: 8001,
    livereload: true
  });
});

gulp.task('default', ['jade', 'sass', 'watch', 'js', 'connect', 'img', 'compress:libs']);
