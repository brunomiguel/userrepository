const packageJson     = require('./package.json');
const devDependencies = Object.keys(packageJson.devDependencies || {});

module.exports = {
    env: {
        node: true
    },
    extends: [
             'eslint:recommended',
        'plugin:node/recommended'
    ],
    parserOptions: {
        ecmaVersion: 9
    },
    rules: {
                   'node/exports-style': [2, 'module.exports'],
        'node/file-extension-in-import': [2, 'always'],
            'node/prefer-global/buffer': [2, 'always'],
           'node/prefer-global/console': [2, 'always'],
           'node/prefer-global/process': [2, 'always'],
          'node/no-unpublished-require': [2, {allowModules: devDependencies}]
    }
};
