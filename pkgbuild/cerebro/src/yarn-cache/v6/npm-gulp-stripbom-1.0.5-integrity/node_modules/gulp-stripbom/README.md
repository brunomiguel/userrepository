gulp-stripbom
------------------------

[![Version][version]](https://npmjs.org/package/gulp-stripbom)
[![Dependency Status][deps]](https://david-dm.org/lichunqiang/gulp-stripbom)
[![Downloads][downloads]](https://npmjs.org/package/gulp-stripbom)

[version]: http://img.shields.io/npm/v/gulp-stripbom.svg?style=flat
[deps]: http://img.shields.io/david/lichunqiang/gulp-stripbom.svg?style=flat
[downloads]: http://img.shields.io/npm/dm/gulp-stripbom.svg?style=flat

> This is inspired by [strip-bom](https://github.com/sindresorhus/strip-bom) for gulp.

## Usage

```javascript
var stripBom = require('gulp-stripbom');

gulp.task('default', function(){

	return gulp.src('1.txt')
			.pipe(stripBom())
			.pipe(gulp.dest('dest'));
});
```

## API

### stripBom(options)

### options.ext

Type: `String` or `Array`

Filter files by ext those to process.

### options.showLog

Type: `Boolean`

Default: `true`

If show log or not.

## Test

```sh
$ npm test
```

## License

MIT
