"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPkg = exports.flatAsync = exports.signApp = exports.signAsync = exports.flat = exports.sign = void 0;
const sign_1 = require("./sign");
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return sign_1.sign; } });
Object.defineProperty(exports, "signAsync", { enumerable: true, get: function () { return sign_1.signApp; } });
Object.defineProperty(exports, "signApp", { enumerable: true, get: function () { return sign_1.signApp; } });
const flat_1 = require("./flat");
Object.defineProperty(exports, "flat", { enumerable: true, get: function () { return flat_1.flat; } });
Object.defineProperty(exports, "flatAsync", { enumerable: true, get: function () { return flat_1.buildPkg; } });
Object.defineProperty(exports, "buildPkg", { enumerable: true, get: function () { return flat_1.buildPkg; } });
// TODO: Remove and leave only proper named exports, but for non-breaking change reasons
// we need to keep this weirdness for now
module.exports = sign_1.sign;
module.exports.sign = sign_1.sign;
module.exports.signAsync = sign_1.signApp;
module.exports.signApp = sign_1.signApp;
module.exports.flat = flat_1.flat;
module.exports.flatAsync = flat_1.buildPkg;
module.exports.buildPkg = flat_1.buildPkg;
//# sourceMappingURL=index.js.map