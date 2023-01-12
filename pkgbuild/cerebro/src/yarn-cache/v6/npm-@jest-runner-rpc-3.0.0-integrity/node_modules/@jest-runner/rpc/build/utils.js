'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const rand = (exports.rand = () => Math.floor(Math.random() * 10000000));

const validateIPCID = (exports.validateIPCID = id => {
  if (typeof id === 'string' && id.match(/ipc/)) {
    return id;
  }
  throw new Error(`Invalid IPC id: "${JSON.stringify(id)}"`);
});

const makeUniqServerId = (exports.makeUniqServerId = () =>
  `ipc-server-${Date.now() + rand()}`);
