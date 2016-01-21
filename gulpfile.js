'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var neat = require('node-neat');
var normalize = require('node-normalize-scss');
var concat = require('gulp-concat');


var config = {
  sassPath: './src/styles',
  bowerDir: './bower_components',
  cssDestDir: './dist/assets/css',
  jsPath: './src/scripts/*.js',
  jsDestDir: './dist/assets/js'
}

gulp.task('cname', function() {
  return gulp
    .src('./CNAME')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('icons', function() {
  return gulp
    .src(config.bowerDir + '/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('scripts', function() {
  return gulp.src([
      config.bowerDir + '/jquery/dist/jquery.js',
      config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
      config.bowerDir + '/photoswipe/dist/photoswipe.js',
      config.bowerDir + '/photoswipe/dist/photoswipe-ui-default.js',
      config.jsPath
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.jsDestDir));
});

gulp.task('sass', function() {
  var sassPaths = neat.includePaths.concat(normalize.includePaths); // neat already includes bourbon
  sassPaths.push(config.bowerDir + '/bootstrap-sass/assets/stylesheets');
  sassPaths.push(config.bowerDir + '/font-awesome/scss');
  sassPaths.push(config.bowerDir + '/photoswipe/src/css');
  sassPaths.push(config.bowerDir + '/photoswipe/src/css/default-skin');

  gulp.src([
    config.sassPath + '/*.scss',
    './bower_components/photoswipe/src/css/*.scss',
    './bower_components/photoswipe/src/css/default-skin/*.scss'
  ])
    .pipe(concat('main.css'))
    .pipe(sass({
      includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestDir));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/styles/*.scss', ['sass']);
});

gulp.task('default', ['cname', 'copy', 'assets', 'icons', 'scripts', 'sass']);
