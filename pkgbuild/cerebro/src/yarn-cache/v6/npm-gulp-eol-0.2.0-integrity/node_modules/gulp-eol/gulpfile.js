var gulp = require('gulp');
var eol = require('./');

gulp.task('default', ['eol']);

gulp.task('eol', function () {
  return gulp.src([
      '**/*.{js,json}',
      '*.*',
      '.*',
      '*',
      '!node_modules/**'
    ]).pipe(eol())
    .pipe(gulp.dest('./'));
});
