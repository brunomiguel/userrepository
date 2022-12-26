const path    = require('path');
const vinyl   = require('vinyl');
const vinylSa = require('vinyl-sourcemaps-apply');
const through = require('through2');
const rollup  = require('rollup');
const hash    = require('object-hash');
const root    = require('njfs').root;

const PLUGIN_NAME = 'gulp-rollup-2';

let cache = {};

const modules = ['es', 'amd', 'cjs', 'iife', 'umd', 'system'];

const isInMod = (format) => modules.indexOf(format) > -1;

const isArray = arg => Object.prototype.toString.call(arg) === '[object Array]';

const unique = (obj) => Array.prototype.filter.call(obj, (v, i) => obj.indexOf(v) === i);

const isEqual = (a, b) => {

	const oka = Object.keys(a);
	const okb = Object.keys(b);
	const ola = oka.length;
	const olb = okb.length;

	if (ola !== olb) {
		return false;
	}

	let i = 0;
	for (; i < ola; i += 1) {

		const ka = oka[i];

		if (b[ka] === undefined) {
			return false;
		}

		const va = a[ka];
		const vb = b[ka];

		if (va == null || typeof va === 'string' || typeof va === 'number') {
			if (va !== vb) {
				return false;
			}
		} else if (typeof va === 'function') {
			if (va.name !== vb.name) {
				return false;
			}
		} else if (va.constructor !== vb.constructor) {
			return false;
		} else {
			return isEqual(va, vb);
		}
	}

	return true;
};

const sanitize = (opts, out) => {

	if (!opts) {
		throw new Error(`${PLUGIN_NAME}:  Missing rollup config options!`);
	}

	if (typeof opts === 'string') {
		opts = [{
			output: {
				format: opts
			}
		}];
	} else if (!isArray(opts)) {
		opts = [opts];
	}

	opts.filter(e => {
		if (out && !e.input) {
			throw new Error(`${PLUGIN_NAME}:  Input option required!`);
		} else if (!e.output) {
			throw new Error(`${PLUGIN_NAME}:  Output option required!`);
		} else if (isArray(e.output)) {
			if (e.output.filter((i) => !i.file || !i.format || !isInMod(i.format)).length) {
				throw new Error(`${PLUGIN_NAME}:  Missing options file, format or unknown format type!`);
			}
		} else if (!e.output.file || !e.output.format || !isInMod(e.output.format)) {
			throw new Error(`${PLUGIN_NAME}:  Missing options file, format or unknown format type!`);
		}
	});

	const options = [];

	opts.forEach((opt, i) => {

		const io = Object.assign({}, opt);
		const oo = io.output;

		delete io.output;

		options[i] = {};
		options[i]['io'] = io;
		options[i]['oo'] = isArray(oo) ? oo : [oo];
	});

	opts = options;

	opts.forEach((opt, i) => {
		const currI = opt.io;
		opts.forEach((e, j) => {
			if (i !== j && isEqual(currI, e.io)) {
				throw new Error(`${PLUGIN_NAME}:  Repetitive input options!`);
			}
		});
	});

	const of = [];

	opts.forEach((opt) => {
		const oo = opt.oo;
		oo.forEach((o, i) => {
			const curr = o;
			oo.forEach((e, j) => {
				if (i !== j) {
					if (isEqual(curr, e) || curr.file === e.file) {
						throw new Error(`${PLUGIN_NAME}:  Two or more output have same file option!`);
					} else {
						of .push(curr.file);
					}
				}
			});
		});
	});

	if ( of .length !== unique( of ).length) {
		throw new Error(`${PLUGIN_NAME}:  Two or more output have same file option!`);
	}

	return opts;
};

const inside = (opts) => {

	opts = sanitize(opts);

	return through({
			objectMode: true
		},
		async (file, encoding, callback) => {

			if (file.isStream()) {
				this.emit('Error', Error(`${PLUGIN_NAME}:  Unsupported file type: Stream!`));
				callback();
			}

			const _map = !!file.sourceMap;
			const _dir = file.cwd;
			const _pat = file.path;
			const _inp = path.relative(_dir, _pat);

			const bundles = await Promise.all(opts.map(async opt => {

				const io = opt.io;
				const oo = opt.oo;

				const ch = hash(io);
				cache[ch] = {};

				io.input = io.input ? path.relative(_dir, io.input) : _inp;
				io.cache = io.cache ? cache[ch] : false;

				const bundle = await rollup.rollup(io);
				cache[ch] = bundle.cache;

				return {
					bundle,
					oo,
					input: io.input
				};
			}));

			let start = 2;

			await Promise.all(bundles.map(async bundle => {

				const oo = bundle.oo;
				const input = bundle.input;
				bundle = bundle.bundle;

				await Promise.all(oo.map(async o => {

					start--;

					const f = o.format;
					const s = start > 0;

					if ((f === 'umd' || f === 'iife') && !o.name) {
						o.name = input;
					}

					if ((f === 'umd' || f === 'amd') && !o.amd || !!o.amd && !o.amd.id) {
						o.amd = Object.assign({}, o.amd, {
							id: o.name
						});
					}

					const build = await bundle.generate(o);
					const [output] = build.output;
					const {
						code
					} = output;
					const buffer = Buffer.from(code, encoding);

					const oBase = path.dirname(path.join(_dir, input));
					const oName = path.basename(o.file);
					const oPath = path.resolve(oBase, oName);
					let oFile = s ? file : new vinyl();
					let map = output.map;

					oFile.path = oPath;
					oFile.contents = buffer;
					oFile.base = oBase;

					if (map !== null) {
						vinylSa(oFile, map);
					} else if (_map && s) {
						map = file.sourceMap;
						map.file = input;
						map.sources = map.sources.map(src => path.relative(_dir, path.join(oBase, src)));
						vinylSa(oFile, map);
					}

					return s ? oFile : this.push(oFile);
				}));

			}));

			callback(null, file);
		});
};

const outside = async (opts) => {

	opts = sanitize(opts, true);

	const _dir = root();
	const _obj = through.obj();

	const bundles = await Promise.all(opts.map(async (opt) => {

		const io = opt.io;
		const oo = opt.oo;

		const ch = hash(io);
		cache[ch] = {};

		io.input = path.relative(_dir, io.input);
		io.cache = io.cache ? cache[ch] : false;

		const bundle = await rollup.rollup(io);
		cache[ch] = bundle.cache;

		return {
			bundle,
			oo,
			input: io.input
		};
	}));

	await Promise.all(bundles.map(async bundle => {

		const oo = bundle.oo;
		const input = bundle.input;
		bundle = bundle.bundle;

		await Promise.all(oo.map(async o => {

			const f = o.format;

			if ((f === 'umd' || f === 'iife') && !o.name) {
				o.name = input;
			}

			if ((f === 'umd' || f === 'amd') && !o.amd || !!o.amd && !o.amd.id) {
				o.amd = Object.assign({}, o.amd, {
					id: o.name
				});
			}

			const build = await bundle.generate(o);
			const [output] = build.output;
			const {
				code,
				map
			} = output;
			const buffer = Buffer.from(code, "utf8");

			const oBase = path.dirname(path.join(_dir, input));
			const oName = path.basename(o.file);
			const oPath = path.resolve(oBase, oName);
			const oFile = new vinyl({
				base: oBase,
				path: oPath,
				contents: buffer
			});

			if (map !== null) {
				vinylSa(oFile, map);
			}

			_obj.push(oFile);
		}));
	}));

	_obj.push(null);

	return _obj;
};

module.exports = {
	rollup: inside,
	src: outside
};
