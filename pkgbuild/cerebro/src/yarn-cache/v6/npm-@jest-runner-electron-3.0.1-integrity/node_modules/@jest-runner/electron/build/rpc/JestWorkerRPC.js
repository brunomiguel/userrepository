'use strict';

var _runTest2 = require('jest-runner/build/runTest');
var _runTest3 = _interopRequireDefault(_runTest2);

var _utils = require('@jest-runner/core/utils');

var _electron = require('electron');
var _resolver = require('../utils/resolver');
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
 */ const isMain = process.env.isMain === 'true';
const _runInNode = async testData => {
  try {
    return (0, _runTest3.default)(
      testData.path,
      testData.globalConfig,
      testData.config,
      (0, _resolver.getResolver)(
        testData.config,
        testData.serialisableModuleMap
      )
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (0, _utils.buildFailureTestResult)(
      testData.path,
      error,
      testData.config,
      testData.globalConfig
    );
  }
};

const _runInBrowserWindow = testData => {
  return new Promise(resolve => {
    const workerID = (0, _utils.makeUniqWorkerId)();
    const win = new _electron.BrowserWindow({
      show: false,
      webPreferences: {nodeIntegration: true, contextIsolation: false}
    });

    win.loadURL(`file://${require.resolve('../index.html')}`);
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('run-test', testData, workerID);
    });

    _electron.ipcMain.once(workerID, (event, testResult) => {
      win.destroy();
      resolve(testResult);
    });
  }).catch(error => {
    const testResult = (0, _utils.buildFailureTestResult)(
      testData.path,
      error,
      testData.config,
      testData.globalConfig
    );

    return testResult;
  });
};

const _runTest = testData => {
  testData.config.extraGlobals || (testData.config.extraGlobals = []);
  return isMain ? _runInNode(testData) : _runInBrowserWindow(testData);
};

module.exports = {
  runTest(testData) {
    return _runTest(testData);
  },
  shutDown() {
    return Promise.resolve();
  }
};
