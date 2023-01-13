# Gulp Rollup 2

[![Build Status](https://travis-ci.com/orcunsaltik/gulp-rollup-2.svg?branch=master)](https://travis-ci.com/orcunsaltik/gulp-rollup-2)
[![Dependency Status](https://david-dm.org/orcunsaltik/gulp-rollup-2.svg)](https://david-dm.org/orcunsaltik/gulp-rollup-2)
[![devDependencies Status](https://david-dm.org/orcunsaltik/gulp-rollup-2/dev-status.svg)](https://david-dm.org/orcunsaltik/gulp-rollup-2?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/035ff3499e767eb6b552/maintainability)](https://codeclimate.com/github/orcunsaltik/gulp-rollup-2/maintainability)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/orcunsaltik/gulp-rollup-2)
![npm](https://img.shields.io/npm/dt/gulp-rollup-2)
[![NPM Version](https://badge.fury.io/js/gulp-rollup-2.svg?style=flat)](https://npmjs.org/package/gulp-rollup-2)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/orcunsaltik/gulp-rollup-2/issues)
![node-current](https://img.shields.io/node/v/gulp-rollup-2)

A [Gulp](https://www.npmjs.com/package/gulp) plugin for [Rollup](https://www.npmjs.com/package/rollup) Javascript Module Bundler.

You can use before or after any gulp plugins with Rollup Api.
Any map created by a gulp plugin like gulp-sourcemaps will be overriden if the
sourcemap option of the rollup config is set to true; 

## Install

``` bash
npm install --save-dev gulp-rollup-2
```

## Usage

### A - Inside the gulp pipe(): (between src() & dest() methods of gulp)

``` js
const gulp = require('gulp');
const gru2 = require('gulp-rollup-2');

gulp.task('bundle', () => 
  gulp.src('./src/**/*.js')
    .pipe(gru2.rollup({
           input: 'src/app.js',
        external: ['window'],
         plugins: [plugin1(), plugin2()],
           cache: true,
          output: [
            {
                   file: 'example.js',
                   name: 'example', 
                 format: 'umd',
                globals: {window: 'window'}
            },
            {
                   file: 'example.esm.bundle.js',
                 format: 'es',
                globals: {window: 'window'}
            },
        ]}))
    .pipe(gulp.dest('./dist'));
);
```
### B - When it comes first...

The file path in the input option of the Rollup Api config object used in the src() method of gulp-rollup-2 plugin replaces the role of src() method of gulp.

``` js
const gulp = require('gulp');
const gru2 = require('gulp-rollup-2');

gulp.task('bundle', async () =>
  (await gru2.src(...opts))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
);
```

## Troubleshooting

When you encounter a problem, please open an issue. I would be glad to help you to find a solution if possible.

## Author

Github: [@orcunsaltik](https://github.com/orcunsaltik)

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).