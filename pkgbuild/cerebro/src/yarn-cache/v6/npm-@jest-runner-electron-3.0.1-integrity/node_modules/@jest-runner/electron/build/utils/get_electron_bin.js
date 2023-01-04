'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.getElectronBin = undefined;

var _path = require('path');
var _path2 = _interopRequireDefault(_path);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */ const getElectronBin = (exports.getElectronBin = from => {
  try {
    // first try to resolve from the `rootDir` of the project
    return _path2.default.resolve(
      // $FlowFixMe wrong core flow types for require.resolve
      require.resolve('electron', {paths: [from]}),
      '..',
      'cli.js'
    );
  } catch (error) {
    // default to electron included in this package's dependencies
    return _path2.default.resolve(require.resolve('electron'), '..', 'cli.js');
  }
});
