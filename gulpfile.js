'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var neat = require('node-neat');
var normalize = require('node-normalize-scss');


var config = {
  sassPath: './src/styles',
  bowerDir: './bower_components',
  destDir: './assets/css'
}

gulp.task('sass', function() {
  var sassPaths = neat.includePaths.concat(normalize.includePaths); // neat already includes bourbon
  sassPaths.push(config.bowerDir + '/bootstrap-sass/assets/stylesheets');

  gulp.src(config.sassPath + '/*.scss')
    .pipe(sass({
      includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.destDir));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/styles/*.scss', ['sass']);
});
