'use strict';

var _console = require('console');

var _electron = require('electron');

var _RPCConnection = require('@jest-runner/rpc/RPCConnection');
var _RPCConnection2 = _interopRequireDefault(_RPCConnection);
var _JestWorkerRPC = require('./rpc/JestWorkerRPC');
var _JestWorkerRPC2 = _interopRequireDefault(_JestWorkerRPC);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}  // $FlowFixMe flow doesn't know about console
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
delete global.console;
global.console = new _console.Console(process.stdout, process.stderr);
const isMain = process.env.isMain === 'true'; // for testing purposes, it is probably a good idea to keep everything at
// the same scale so that renders do not vary from device to device.
_electron.app.commandLine.appendSwitch('high-dpi-support', 1);
_electron.app.commandLine.appendSwitch('force-device-scale-factor', 1);
_electron.app.on('ready', async () => {
  // electron automatically quits if all windows are destroyed,
  // this mainWindow will keep electron running even if all other windows
  // are gone. There's probably a better way to do it
  // eslint-disable-next-line no-unused-vars
  const mainWindow = new _electron.BrowserWindow({show: false});
  if (isMain) {
    // we spin up an electron process for each test on the main process
    // which pops up an icon for each on macOs. Hiding them is less intrusive
    _electron.app.dock && _electron.app.dock.hide();
  }

  const rpcConnection = new _RPCConnection2.default(_JestWorkerRPC2.default);
  await rpcConnection.connect();
});
