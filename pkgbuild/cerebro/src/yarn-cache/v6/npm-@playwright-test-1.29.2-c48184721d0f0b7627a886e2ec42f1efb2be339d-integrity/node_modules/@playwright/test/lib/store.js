"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _globals = require("./globals");
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright Microsoft Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class JsonStore {
  _toFilePath(name) {
    const testInfo = (0, _globals.currentTestInfo)();
    if (!testInfo) throw new Error('store can only be called while test is running');
    const fileName = (0, _util.sanitizeForFilePath)((0, _util.trimLongString)(name)) + '.json';
    return _path.default.join(testInfo.config._storeDir, testInfo.project._id, fileName);
  }
  async get(name) {
    const file = this._toFilePath(name);
    try {
      const data = (await _fs.default.promises.readFile(file)).toString('utf-8');
      return JSON.parse(data);
    } catch (e) {
      return undefined;
    }
  }
  async set(name, value) {
    const file = this._toFilePath(name);
    if (value === undefined) {
      await _fs.default.promises.rm(file, {
        force: true
      });
      return;
    }
    const data = JSON.stringify(value, undefined, 2);
    await _fs.default.promises.mkdir(_path.default.dirname(file), {
      recursive: true
    });
    await _fs.default.promises.writeFile(file, data);
  }
}
const store = new JsonStore();
exports.store = store;