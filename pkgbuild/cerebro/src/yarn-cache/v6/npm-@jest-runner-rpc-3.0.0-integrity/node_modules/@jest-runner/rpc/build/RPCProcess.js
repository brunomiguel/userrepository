'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var _child_process = require('child_process');
var _utils = require('./utils');
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _constants = require('./constants');
var _nodeIpc = require('node-ipc');
var _jsonrpc = require('./jsonrpc');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}
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

class RPCProcess {
  constructor(options) {
    _defineProperty(this, '_ipc', void 0);
    _defineProperty(this, 'server', void 0);
    _defineProperty(this, 'serverID', void 0);
    _defineProperty(this, 'isAlive', void 0);
    _defineProperty(this, '_spawn', void 0);
    _defineProperty(this, 'remote', void 0);
    _defineProperty(this, '_socket', void 0);
    _defineProperty(this, '_pendingRequests', void 0);
    _defineProperty(this, '_subprocess', void 0);
    this.serverID = (0, _utils.makeUniqServerId)();
    this.isAlive = false;
    this._ipc = new _nodeIpc.IPC();

    this._spawn = options.spawnNode
      ? makeSpawnNodeFn(this.serverID, options.spawnNode)
      : options.spawn;
    this.remote = this.initializeRemote();
    this._pendingRequests = {};
  }

  initializeRemote() {
    throw new Error('not implemented');
  }

  async start() {
    this._ipc.config.id = this.serverID;
    this._ipc.config.retry = 1500;
    this._ipc.config.silent = true;

    this._subprocess = this._spawn({serverID: this.serverID});
    const socket = await new Promise(async resolve => {
      this._ipc.serve(() => {
        this._ipc.server.on(
          _constants.INITIALIZE_MESSAGE,
          (message, socket) => {
            this.server = this._ipc.server;
            this.isAlive = true;
            resolve(socket);
          }
        );

        this._ipc.server.on(_constants.JSONRPC_EVENT_NAME, json => {
          this.handleJsonRPCResponse(json);
        });
      });
      this._ipc.server.start();
    });

    this._socket = socket;
  }

  stop() {
    this.server && this.server.stop();
    if (this._subprocess && this.isAlive) {
      try {
        process.kill(-this._subprocess.pid, 'SIGKILL');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    this._subprocess.kill('SIGKILL');
    delete this.server;
    this.isAlive = false;
  }

  async jsonRPCCall(method, ...args) {
    this._ensureServerStarted();
    return new Promise((resolve, reject) => {
      const {id, json} = (0, _jsonrpc.serializeRequest)(method, [...args]);
      this.server.emit(this._socket, _constants.JSONRPC_EVENT_NAME, json);
      this._pendingRequests[id] = {
        resolve: data => {
          delete this._pendingRequests[id];
          resolve(data);
        },
        reject: error => {
          delete this._pendingRequests[id];
          reject(new Error(`${error.code}:${error.message}\n${error.data}`));
        }
      };
    });
  }

  handleJsonRPCResponse(json) {
    const response = (0, _jsonrpc.parseResponse)(json);
    const {id, result, error} = response;

    if (error) {
      this._pendingRequests[id].reject(error);
    } else {
      this._pendingRequests[id].resolve(result);
    }
  }

  _ensureServerStarted() {
    if (!this.server) {
      throw new Error(`
        RPCProcess need to be started before making any RPC calls.
        e.g.:
        --------
        const rpcProcess = new MyRPCProcess(options);
        await rpcProcess.start();
        const result = rpcProcess.remote.doSomething();
      `);
    }
  }
}
exports.default = RPCProcess;

const getBabelNodeBin = () =>
  _path2.default.resolve(__dirname, '../../../node_modules/.bin/babel-node');

const makeSpawnNodeFn = (serverID, {initFile, useBabel}) => {
  return () => {
    const bin = useBabel ? getBabelNodeBin() : 'node';

    return (0, _child_process.spawn)(bin, [initFile], {
      stdio: ['inherit', process.stderr, 'inherit'],
      env: _objectSpread(
        _objectSpread({}, process.env),
        {},
        {
          JEST_SERVER_ID: serverID
        }
      ),

      detached: true
    });
  };
};
