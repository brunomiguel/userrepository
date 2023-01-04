'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var _jestMock = require('jest-mock');
var _jestMock2 = _interopRequireDefault(_jestMock);
var _jestUtil = require('jest-util');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

class ElectronEnvironment {
  constructor(config) {
    _defineProperty(this, 'global', void 0);
    _defineProperty(this, 'moduleMocker', void 0);
    _defineProperty(this, 'fakeTimers', void 0);
    this.global = global;
    this.moduleMocker = new _jestMock2.default.ModuleMocker(global);
    this.fakeTimers = {
      useFakeTimers() {
        throw new Error('fakeTimers are not supproted in electron environment');
      },
      clearAllTimers() {}
    };

    (0, _jestUtil.installCommonGlobals)(global, config.globals);
  }

  async setup() {}

  async teardown() {}

  runScript(script) {
    // Since evrey tests runs in a new window we don't need any extra isolation
    // as we need in Jest node runner
    return script.runInThisContext();
  }
}
exports.default = ElectronEnvironment;
