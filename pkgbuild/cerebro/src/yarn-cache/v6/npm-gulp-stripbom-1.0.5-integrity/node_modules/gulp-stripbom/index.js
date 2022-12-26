'use strict';
var path  = require('path');
var through = require('through2');
var stripBom = require('strip-bom');
var symbols = require('log-symbols');
var log = require('fancy-log');
var c = require('ansi-colors');
var PluginError = require('plugin-error');

var PLUGIN_NAME = 'gulp-stripbom';

module.exports = function(opts){
    if(!opts) {
        opts = {};
    }
    if(opts.showLog === undefined) {
        opts.showLog = true;
    }

	return through.obj(function(file, enc, cb){
		//let null files pass through
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        var fileExt = path.extname(file.path).slice(1);
        //check file ext
        if(opts.ext) {
            var filexts = Array.isArray(opts.ext) ? opts.ext : [opts.ext];
            if(filexts.indexOf(fileExt) === -1) {
                this.push(file);
                return cb();
            }
        }
        //is stream
        if(file.isStream()) {

        	file.contents = file.contents.pipe(stripBom.stream());
        }

        //is buffer
        if(file.isBuffer()) {

        	file.contents = stripBom(file.contents);
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);
        if(opts.showLog) {
            log(c.cyan(PLUGIN_NAME + ':'), file.relative + ' ' + symbols.success);
        }

        // tell the stream engine that we are done with this file
		cb();
	}).on('error', function(err){
		throw new PluginError(PLUGIN_NAME, err.message);
	});
};
