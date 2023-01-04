"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.memoize = void 0;
var store = new WeakMap();
var isCachedValue = function (cachedValue, arg, cache) { return cache.has(arg) && cache.get(arg) === cachedValue; };
var memoize = function (fn) {
    var cache = new Map();
    var memoized = function (arg) {
        var cachedValue = cache.get(arg);
        if (isCachedValue(cachedValue, arg, cache)) {
            return cachedValue;
        }
        var result = fn.call(this, arg);
        cache.set(arg, result);
        return result;
    };
    store.set(memoized, cache);
    return memoized;
};
exports.memoize = memoize;
var clear = function (fn) {
    var x = store.get(fn);
    if (x) {
        x.clear();
    }
};
exports.clear = clear;
//# sourceMappingURL=memoize.js.map