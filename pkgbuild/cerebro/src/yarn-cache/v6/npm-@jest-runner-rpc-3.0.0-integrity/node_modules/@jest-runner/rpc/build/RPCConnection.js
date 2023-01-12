'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var _utils = require('./utils');
var _nodeIpc = require('node-ipc');
var _constants = require('./constants');
var _jsonrpc = require('./jsonrpc');
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class RPCConnection {
  constructor(methods) {
    _defineProperty(this, 'methods', void 0);
    _defineProperty(this, '_ipc', void 0);
    this.methods = methods;
    this._ipc = new _nodeIpc.IPC();
  }

  async connect(_serverID) {
    return new Promise(resolve => {
      const serverID =
        _serverID || (0, _utils.validateIPCID)(process.env.JEST_SERVER_ID);
      this._ipc.config.id = serverID;
      this._ipc.config.silent = true;
      this._ipc.config.retry = 1500;

      this._ipc.connectTo(serverID, () => {
        this._ipc.of[serverID].on('connect', () => {
          this._ipc.of[serverID].emit(_constants.INITIALIZE_MESSAGE);
        });

        this._ipc.of[serverID].on(_constants.JSONRPC_EVENT_NAME, data => {
          const {method, params, id} = (0, _jsonrpc.parseRequest)(data);
          this.methods[method]
            .apply(null, params)
            .then(result => {
              this._ipc.of[serverID].emit(
                _constants.JSONRPC_EVENT_NAME,

                (0, _jsonrpc.serializeResultResponse)(result, id)
              );
            })
            .catch(error => {
              this._ipc.of[serverID].emit(
                _constants.JSONRPC_EVENT_NAME,

                (0, _jsonrpc.serializeErrorResponse)(error, id)
              );
            });
        });

        resolve();
      });
    });
  }
}
exports.default = RPCConnection;
