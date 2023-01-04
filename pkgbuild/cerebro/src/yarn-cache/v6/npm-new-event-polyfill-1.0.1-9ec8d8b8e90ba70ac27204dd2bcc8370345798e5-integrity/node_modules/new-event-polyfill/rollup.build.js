const babelrc = require('babelrc-rollup').default;
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const rollup = require('rollup').rollup;

const defaultConfig = {
    format: 'iife',
    name: 'Polyfill',
    strict: false
};

function input(input) {
    return {
        input,
        plugins: [ babel(babelrc()), uglify() ]
    };
}

function output(file) {
    return function (bundle) {
        bundle.write(Object.assign({}, defaultConfig, { file }));
    };
}

rollup(input('./src/Event/index.js')).then(output('./newEventPolyfill.js'));
