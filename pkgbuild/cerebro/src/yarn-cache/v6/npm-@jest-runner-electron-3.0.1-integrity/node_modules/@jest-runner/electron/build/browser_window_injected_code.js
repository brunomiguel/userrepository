'use strict';

var _utils = require('@jest-runner/core/utils');
var _electron = require('electron');
var _runTest = require('jest-runner/build/runTest');
var _runTest2 = _interopRequireDefault(_runTest);
var _resolver = require('./utils/resolver');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}  // For some reason without 'unsafe-eval' electron runner can't read snapshot files
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
// and tries to write them every time it runs
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true; // react devtools only checks for the presence of a production environment
// in order to suggest downloading it, which means it logs a msg in a test environment
if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true};
} // $FlowFixMe
const {Console} = require('console');
_electron.ipcRenderer.on('run-test', async (event, testData, workerID) => {
  try {
    const result = await (0, _runTest2.default)(
      testData.path,
      testData.globalConfig,
      testData.config,
      (0, _resolver.getResolver)(
        testData.config,
        testData.serialisableModuleMap
      )
    );

    _electron.ipcRenderer.send(workerID, result);
  } catch (error) {
    _electron.ipcRenderer.send(
      workerID,
      (0, _utils.buildFailureTestResult)(
        testData.path,
        error,
        testData.config,
        testData.globalConfig
      )
    );

    // eslint-disable-next-line no-console
    console.error(error);
  }
});

const patchConsole = () => {
  const mainConsole = new Console(process.stdout, process.stderr);
  const rendererConsole = global.console;
  const mergedConsole = {};
  Object.getOwnPropertyNames(rendererConsole)
    .filter(prop => typeof rendererConsole[prop] === 'function')
    .forEach(prop => {
      mergedConsole[prop] =
        typeof mainConsole[prop] === 'function'
          ? (...args) => {
              mainConsole[prop](...args);
              return rendererConsole[prop](...args);
            }
          : (...args) => rendererConsole[prop](...args);
    });
  delete global.console;
  global.console = mergedConsole;
};
patchConsole();
