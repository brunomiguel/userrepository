'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var _TestRunner = require('./TestRunner');
var _TestRunner2 = _interopRequireDefault(_TestRunner);
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
 */ class TestRunnerRenderer extends _TestRunner2.default {
  getTarget() {
    return 'renderer';
  }
}
exports.default = TestRunnerRenderer;
