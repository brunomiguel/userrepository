'use strict';

var _RPCProcess = require('@jest-runner/rpc/RPCProcess');
var _RPCProcess2 = _interopRequireDefault(_RPCProcess);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
/**
 * ****************************************************
 * THIS IS A GENERATED FILE. DO NOT MODIFY IT MANUALLY!
 * ****************************************************
 *
 * @generated 65cf6e68c243bb4f0ab6c32d61b6f5a4
 */ class JestWorkerRPCProcess extends _RPCProcess2.default {
  initializeRemote() {
    return {
      runTest: this.jsonRPCCall.bind(this, 'runTest'),
      shutDown: this.jsonRPCCall.bind(this, 'shutDown')
    };
  }
}

module.exports = JestWorkerRPCProcess;
