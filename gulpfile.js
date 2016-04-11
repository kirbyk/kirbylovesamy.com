'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var neat = require('node-neat');
var normalize = require('node-normalize-scss');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var webpack = require('gulp-webpack');


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

gulp.task('html', function() {
  return gulp
    .src('./src/*.html')
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
  return gulp.src('./src/scripts/main.js')
    .pipe(webpack(require('./webpack.config.js')))
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

// TODO: fix this hack
function delayedReload() {
  setTimeout(function() {
    browserSync.reload();
  }, 1000);
}

gulp.task('watch', function() {
  gulp.watch('./src/*.html', ['html', delayedReload]);
  gulp.watch('./src/styles/*.scss', ['sass', delayedReload]);
  gulp.watch('./src/scripts/*', ['scripts', delayedReload]);
});

gulp.task('serve', ['cname', 'assets', 'icons', 'html', 'scripts', 'sass'], function() {
  // TODO: fix this hack
  setTimeout(function() {
    browserSync.init({
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
      },
      server: {
        baseDir: './dist',
      },
    });
  }, 1000);

  gulp.start(['watch']);
});

gulp.task('default', ['serve']);
