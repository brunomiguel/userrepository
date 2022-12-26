module.exports = {
    env: {
        browser: true,
           node: true
    },
    extends: [
             'eslint:recommended',
        'plugin:node/recommended'
    ],
    parserOptions: {
        'ecmaVersion': 9
    }
};
