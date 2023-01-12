'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.parseResponse = exports.serializeErrorResponse = exports.serializeResultResponse = exports.parseRequest = exports.serializeRequest = exports.makeRequest = undefined;

var _v = require('uuid/v4');
var _v2 = _interopRequireDefault(_v);
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
 */ const makeRequest = (exports.makeRequest = (method, params) => {
  return {jsonrpc: '2.0', method, params, id: (0, _v2.default)()};
});

const serializeRequest = (exports.serializeRequest = (method, params) => {
  const request = makeRequest(method, params);
  return {id: request.id, json: JSON.stringify(request)};
});

const parseRequest = (exports.parseRequest = json => {
  const obj = JSON.parse(json);
  return obj;
});

const serializeResultResponse = (exports.serializeResultResponse = (
  result,
  id
) => {
  const response = {
    jsonrpc: '2.0',
    result,
    id
  };

  return JSON.stringify(response);
});

const serializeErrorResponse = (exports.serializeErrorResponse = (
  error,
  id
) => {
  const response = {
    jsonrpc: '2.0',
    error: makeError(error),
    id
  };

  return JSON.stringify(response);
});

const parseResponse = (exports.parseResponse = json => {
  const obj = JSON.parse(json);
  return obj;
});

const makeError = (error, code = 1) => {
  if (error instanceof Error) {
    return {
      code,
      message: error.message,
      data: error.stack
    };
  }

  return {
    code,
    mesasge: JSON.stringify(error)
  };
};
