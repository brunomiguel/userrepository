var stripBom = require('./index');
var File = require('vinyl');
var assert = require('assert');
var es = require('event-stream');
var PassThrough = require('stream').PassThrough

describe('gulp-stripbom', function(){

	//test buffer

	describe('in buffer mode', function(){

		it('should strip the bom', function(done){
			var mockFile =  new File({
				cwd: "/",
				base: "/test/",
				path: "/test/file.coffee",
				contents: new Buffer('\ufeffUnicorn')
			});

			var stream = stripBom();

			stream.on('data', function(file){
				assert(file.isBuffer());

				assert.equal(file.contents.toString('utf-8'), 'Unicorn');

			});

			stream.on('end', function(){
				done();
			});

			stream.write(mockFile);

			stream.end();

		});


	});

	describe('in stream mode', function(){

		it('should strip the bom', function(done){
			var mockStream = new PassThrough();
			mockStream.write('\ufeffUnicorn')
			mockStream.end();

			var mockFile = new File({
				cwd: "/",
				base: "/test/",
				path: "/test/file.coffee",
				contents: mockStream
			});

			var stream = stripBom();

			stream.on('data', function(file){
				assert(file.isStream());

				file.pipe(es.wait(function(err, data) {
					assert.equal(data, 'Unicorn')
				}));

			});

			stream.on('end', function(){
				done();
			});

			stream.write(mockFile);

			stream.end();

		});

	});

	it('should not process file', function(done){
		var mockFile =  new File({
			cwd: "/",
			base: "/test/",
			path: "/test/file.coffee",
			contents: new Buffer('\ufeffUnicorn')
		});

		var stream = stripBom({ext:'js'});

		stream.on('data', function(file){
			assert(file.isBuffer());

			assert.equal(file.contents.toString('utf-8'), '\ufeffUnicorn');

		});

		stream.on('end', function(){
			done();
		});

		stream.write(mockFile);

		stream.end();

	});

	it('should process file', function(done){
		var mockFile =  new File({
			cwd: "/",
			base: "/test/",
			path: "/test/file.coffee",
			contents: new Buffer('\ufeffUnicorn')
		});

		var stream = stripBom({ext:['js', 'coffee']});

		stream.on('data', function(file){
			assert(file.isBuffer());

			assert.equal(file.contents.toString('utf-8'), 'Unicorn');

		});

		stream.on('end', function(){
			done();
		});

		stream.write(mockFile);

		stream.end();

	});

	it('should let null files pass through', function(done) {
	        var stream = stripBom();

	        var mockFile = new File({
				cwd: "/",
				base: "/test/",
				path: "/test/file.coffee",
	        	contents: null
	        });

			stream.on('data', function(file){
				assert(file.isNull());

				assert.equal(file.contents, null)
			});

			stream.on('end', function(){
				done();
			});

			stream.write(mockFile);

			stream.end();
	    });
});
