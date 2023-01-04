'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var _child_process = require('child_process');
var _once = require('./utils/once.js');
var _JestWorkerRPCProcess = require('./rpc/JestWorkerRPCProcess.generated');
var _JestWorkerRPCProcess2 = _interopRequireDefault(_JestWorkerRPCProcess);
var _get_electron_bin = require('./utils/get_electron_bin.js');
var _throat = require('throat');
var _throat2 = _interopRequireDefault(_throat);
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

// Share ipc server and farm between multiple runs, so we don't restart
// the whole thing in watch mode every time.
let jestWorkerRPCProcess;

const isMain = target => target === 'main';
const isRenderer = target => target === 'renderer';

const startWorker = async ({rootDir, target}) => {
  if (isRenderer(target) && jestWorkerRPCProcess) {
    return jestWorkerRPCProcess;
  }

  const proc = new _JestWorkerRPCProcess2.default({
    spawn: ({serverID}) => {
      const injectedCodePath = require.resolve(
        './electron_process_injected_code.js'
      );

      const currentNodeBinPath = process.execPath;
      const electronBin = (0, _get_electron_bin.getElectronBin)(rootDir);
      const spawnArgs = [electronBin];
      if (process.env.JEST_ELECTRON_RUNNER_MAIN_THREAD_DEBUG_PORT) {
        spawnArgs.push(
          `--inspect=${process.env.JEST_ELECTRON_RUNNER_MAIN_THREAD_DEBUG_PORT}`
        );
      }
      if (process.env.JEST_ELECTRON_RUNNER_RENDERER_THREAD_DEBUG_PORT) {
        spawnArgs.push(
          `--remote-debugging-port=${process.env.JEST_ELECTRON_RUNNER_RENDERER_THREAD_DEBUG_PORT}`
        );
      }
      spawnArgs.push(injectedCodePath);

      return (0, _child_process.spawn)(currentNodeBinPath, spawnArgs, {
        stdio: [
          'inherit',
          // redirect child process' stdout to parent process stderr, so it
          // doesn't break any tools that depend on stdout (like the ones
          // that consume a generated JSON report from jest's stdout)
          process.stderr,
          'inherit'
        ],

        env: _objectSpread(
          _objectSpread(
            _objectSpread({}, process.env),
            isMain(target) ? {isMain: 'true'} : {}
          ),
          {},
          {
            JEST_SERVER_ID: serverID
          }
        ),

        detached: process.env.JEST_ELECTRON_RUNNER_DISABLE_PROCESS_DETACHMENT
          ? false
          : true
      });
    }
  });

  if (isRenderer(target)) {
    jestWorkerRPCProcess = proc;
  }

  await proc.start();
  DISPOSABLES.add(() => {
    proc.stop();
  });

  return proc;
};

const registerProcessListeners = cleanup => {
  registerProcessListener('SIGINT', () => {
    cleanup();
    process.exit(130);
  });

  registerProcessListener('exit', () => {
    cleanup();
  });

  registerProcessListener('uncaughtException', () => {
    cleanup();
    // This will prevent other handlers to handle errors
    // (e.g. global Jest handler). TODO: find a way to provide
    // a cleanup function to Jest so it runs it instead
    process.exit(1);
  });
};

const DISPOSABLES = new Set();

class TestRunner {
  getTarget() {
    throw new Error('Must be implemented in a subclass');
  }

  constructor(globalConfig) {
    _defineProperty(this, '_globalConfig', void 0);
    _defineProperty(this, '_ipcServerPromise', void 0);
    this._globalConfig = globalConfig;
  }

  async runTests(tests, watcher, onStart, onResult, onFailure) {
    const isWatch = this._globalConfig.watch || this._globalConfig.watchAll;
    const {maxWorkers, rootDir} = this._globalConfig;
    const concurrency = isWatch
      ? // because watch is usually used in the background, we'll only use
        // half of the regular workers so we don't block other develper
        // environment UIs
        Math.ceil(Math.min(tests.length, maxWorkers) / 2)
      : Math.min(tests.length, maxWorkers);
    const target = this.getTarget();

    const cleanup = (0, _once.once)(() => {
      for (const dispose of DISPOSABLES) {
        dispose();
        DISPOSABLES.delete(dispose);
      }
    });

    registerProcessListeners(cleanup);

    // Startup the process for renderer tests, since it'll be one
    // process that every test will share.
    isRenderer(target) && (await startWorker({rootDir, target}));

    await Promise.all(
      tests.map(
        (0, _throat2.default)(concurrency, async test => {
          onStart(test);
          const config = test.context.config;
          const globalConfig = this._globalConfig;
          // $FlowFixMe
          const rpc = await startWorker({rootDir, target});
          await rpc.remote
            .runTest({
              serializableModuleMap: test.context.moduleMap.toJSON(),
              config,
              globalConfig,
              path: test.path
            })
            .then(testResult => {
              testResult.testExecError != null
                ? onFailure(test, testResult.testExecError)
                : onResult(test, testResult);
            })
            .catch(error => onFailure(test, error));
          // If we're running tests in electron 'main' process
          // we need to respawn them for every single test.
          isMain(target) && rpc.stop();
        })
      )
    );

    if (!isWatch) {
      cleanup();
    }
  }
}
exports.default = TestRunner;

// Because in watch mode the TestRunner is recreated each time, we have
// to make sure we're not registering new process events on every test
// run trigger (at some point EventEmitter will start complaining about a
// memory leak if we do).We'll keep a global map of callbalks (because
// `process` is global) and deregister the old callbacks before we register
// new ones.
const REGISTERED_PROCESS_EVENTS_MAP = new Map();
const registerProcessListener = (eventName, cb) => {
  if (REGISTERED_PROCESS_EVENTS_MAP.has(eventName)) {
    process.off(eventName, REGISTERED_PROCESS_EVENTS_MAP.get(eventName));
  }
  process.on(eventName, cb);
  REGISTERED_PROCESS_EVENTS_MAP.set(eventName, cb);
};
