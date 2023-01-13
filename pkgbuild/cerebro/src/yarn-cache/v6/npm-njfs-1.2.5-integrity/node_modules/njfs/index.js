const Path = require('path');
const {
    access,
    rename,
    readdir,
    unlink,
    createReadStream,
    createWriteStream,
    constants,
    lstatSync
} = require('fs');
const crs = createReadStream;
const cws = createWriteStream;
const F_OK = constants.F_OK;
const W_OK = constants.W_OK;

const unix = (path) => path.split(/\\+/).join('/');

const isDir = (file) => lstatSync(file).isDirectory();

const isFile = (file) => lstatSync(file).isFile();

const list = async (path, opts) => new Promise((res, rej) =>
    readdir(path, opts, (err, dir) => {
        if (err) {
                rej(err);
        }
        let ext = opts && opts.extensions;
        if (dir && ext) {
                if (typeof ext === 'string') {
                        ext = ext.split(',');
                }
                ext = ext.map(ext => '.' + ext.replace(/\.|\s*/g, ''));
                dir = dir.filter(file => ext.indexOf(Path.extname(file)) > -1);
        }
        res(dir);
    }));

const root = () => {
    return Path.join(__dirname, `..${Path.sep}..${Path.sep}`);
};

const copy = async (file, dest) => {

    const sep = Path.sep;

    file = file.replace(/\/|\\/g, sep).replace(/[/\\]+$/g, '');
    dest = dest.replace(/\/|\\/g, sep).replace(/[/\\]+$/g, '');

    const fn = Path.basename(file);
    const ex = Path.extname(dest);

    let dir = dest;

    if (!ex) {
        dest += sep + fn;
    } else {
        dir = dest.substring(0, dest.lastIndexOf(sep));
    }

    await new Promise((res, rej) => access(dest, F_OK | W_OK,
        () => unlink(dest, () => {
                const frst = crs(file);
                const fwst = cws(Path.resolve(dir, fn));
                frst.pipe(fwst);
                frst.on('end', () => res(dest))
                    .on('error', (e) => rej(e));
        })));
};

const move = async (file, dest) => {

    const sep = Path.sep;

    file = file.replace(/\/|\\/g, sep).replace(/[/\\]+$/g, '');
    dest = dest.replace(/\/|\\/g, sep).replace(/[/\\]+$/g, '');

    const fn = Path.basename(file);
    const ex = Path.extname(dest);

    if (!ex) {
        dest += sep + fn;
    }

    await new Promise((res, rej) => access(dest, F_OK | W_OK,
            () => unlink(dest, () => rename(file, dest,
                    (e) => (e ? rej(e) : res(dest))))));
};

module.exports = {
    copy,
    move,
    list,
    root,
    isFile,
    isDir,
    unix
};
