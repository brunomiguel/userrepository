"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMutatedPackageJson = exports.readRawPackageJson = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const hook_1 = require("./hook");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readRawPackageJson = async (dir) => fs_extra_1.default.readJson(path_1.default.resolve(dir, 'package.json'));
exports.readRawPackageJson = readRawPackageJson;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readMutatedPackageJson = async (dir, forgeConfig) => (0, hook_1.runMutatingHook)(forgeConfig, 'readPackageJson', await (0, exports.readRawPackageJson)(dir));
exports.readMutatedPackageJson = readMutatedPackageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wYWNrYWdlLWpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9yZWFkLXBhY2thZ2UtanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFHeEIsd0RBQTBCO0FBRTFCLGlDQUF5QztBQUV6Qyw4REFBOEQ7QUFDdkQsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsR0FBVyxFQUFnQixFQUFFLENBQUMsa0JBQUUsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUF6RyxRQUFBLGtCQUFrQixzQkFBdUY7QUFFdEgsOERBQThEO0FBQ3ZELE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBRSxXQUFnQyxFQUFnQixFQUFFLENBQzFHLElBQUEsc0JBQWUsRUFBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxJQUFBLDBCQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFEcEUsUUFBQSxzQkFBc0IsMEJBQzhDIn0=