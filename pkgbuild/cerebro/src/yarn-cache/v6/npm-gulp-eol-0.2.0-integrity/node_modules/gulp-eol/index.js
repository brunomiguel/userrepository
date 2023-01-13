'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var EOL = require('os').EOL;

module.exports = function (eol, append) {
  if (eol == null) eol = EOL;
  if (append == null) append = true;

  function processEOL(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-eol', 'Streaming not supported'));
      return cb();
    }

    if (file.isBuffer()) {
      try {
        var str = file.contents.toString();
        str = str.replace(/\r?\n/g, eol);
        if (append && !(
          new RegExp(eol + '$').test(str))
          ) {
          str += eol;
        }
        file.contents = new Buffer(str);
      } catch (e) {
        this.emit('error', e);
      }
    }

    this.push(file);
    cb();
  }

  return through.obj(processEOL);
};
