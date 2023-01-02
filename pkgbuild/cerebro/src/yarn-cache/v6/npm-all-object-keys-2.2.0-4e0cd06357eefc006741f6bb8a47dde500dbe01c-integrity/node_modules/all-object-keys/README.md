# all-object-keys [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Get all keys of object. Use [jessy](https://github.com/coderaiser/jessy "jessy") to get value.
Use [nessy](https://github.com/coderaiser/nessy "nessy") to set value.

## Install

`npm i all-object-keys --save`

## Hot to use?

```js
const keys = require('all-object-keys');

keys({
    universal: true,
    hello: {
        world: 'could be used in browser as well',
    },
});

// returns
['universal', 'hello.world'];
```

## Related

- [jessy](https://github.com/coderaiser/jessy "jessy") - get value by object property.
- [nessy](https://github.com/coderaiser/nessy "nessy") - set value in nested object.

## License

MIT

[NPMIMGURL]: https://img.shields.io/npm/v/all-object-keys.svg?style=flat
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/all-object-keys/master.svg?style=flat
[DependencyStatusIMGURL]: https://img.shields.io/david/coderaiser/all-object-keys.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/all-object-keys "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/all-object-keys "Build Status"
[DependencyStatusURL]: https://david-dm.org/coderaiser/all-object-keys "Dependency Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/all-object-keys?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/all-object-keys/badge.svg?branch=master&service=github
