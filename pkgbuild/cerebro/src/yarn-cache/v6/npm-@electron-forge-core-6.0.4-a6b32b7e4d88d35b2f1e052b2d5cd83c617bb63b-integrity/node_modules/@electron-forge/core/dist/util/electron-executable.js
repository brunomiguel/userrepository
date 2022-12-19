"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginCompileExists = void 0;
const path_1 = __importDefault(require("path"));
const core_utils_1 = require("@electron-forge/core-utils");
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
function pluginCompileExists(packageJSON) {
    if (!packageJSON.devDependencies) {
        return false;
    }
    const pluginCompileName = '@electron-forge/plugin-compile';
    const findPluginCompile = (packageName) => packageName === pluginCompileName;
    if (Object.keys(packageJSON.devDependencies).find(findPluginCompile)) {
        return true;
    }
    if (Object.keys(packageJSON.dependencies || {}).find(findPluginCompile)) {
        console.warn(log_symbols_1.default.warning, chalk_1.default.yellow(`${pluginCompileName} was detected in dependencies, it should be in devDependencies`));
        return true;
    }
    return false;
}
exports.pluginCompileExists = pluginCompileExists;
async function locateElectronExecutable(dir, packageJSON) {
    let electronModulePath = await (0, core_utils_1.getElectronModulePath)(dir, packageJSON);
    if ((electronModulePath === null || electronModulePath === void 0 ? void 0 : electronModulePath.endsWith('electron-prebuilt-compile')) && !pluginCompileExists(packageJSON)) {
        console.warn(log_symbols_1.default.warning, chalk_1.default.yellow('WARNING: found electron-prebuilt-compile without the Electron Forge compile plugin. Please remove the deprecated electron-prebuilt-compile from your devDependencies.'));
        electronModulePath = undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let electronExecPath = require(electronModulePath || path_1.default.resolve(dir, 'node_modules/electron'));
    if (typeof electronExecPath !== 'string') {
        console.warn(log_symbols_1.default.warning, 'Returned Electron executable path is not a string, defaulting to a hardcoded location. Value:', electronExecPath);
        electronExecPath = require(path_1.default.resolve(dir, 'node_modules/electron'));
    }
    return electronExecPath;
}
exports.default = locateElectronExecutable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24tZXhlY3V0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2VsZWN0cm9uLWV4ZWN1dGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLDJEQUFtRTtBQUNuRSxrREFBMEI7QUFDMUIsOERBQXFDO0FBS3JDLFNBQWdCLG1CQUFtQixDQUFDLFdBQXdCO0lBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFO1FBQ2hDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxNQUFNLGlCQUFpQixHQUFHLGdDQUFnQyxDQUFDO0lBQzNELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxXQUFtQixFQUFXLEVBQUUsQ0FBQyxXQUFXLEtBQUssaUJBQWlCLENBQUM7SUFFOUYsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUErQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDcEYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksTUFBTSxDQUFDLElBQUksQ0FBRSxXQUFXLENBQUMsWUFBNkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUN6RixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsT0FBTyxFQUFFLGVBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsZ0VBQWdFLENBQUMsQ0FBQyxDQUFDO1FBQ3JJLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFsQkQsa0RBa0JDO0FBRWMsS0FBSyxVQUFVLHdCQUF3QixDQUFDLEdBQVcsRUFBRSxXQUF3QjtJQUMxRixJQUFJLGtCQUFrQixHQUF1QixNQUFNLElBQUEsa0NBQXFCLEVBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNGLElBQUksQ0FBQSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxRQUFRLENBQUMsMkJBQTJCLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2xHLE9BQU8sQ0FBQyxJQUFJLENBQ1YscUJBQVUsQ0FBQyxPQUFPLEVBQ2xCLGVBQUssQ0FBQyxNQUFNLENBQ1YsdUtBQXVLLENBQ3hLLENBQ0YsQ0FBQztRQUNGLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztLQUNoQztJQUVELDhEQUE4RDtJQUM5RCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFFakcsSUFBSSxPQUFPLGdCQUFnQixLQUFLLFFBQVEsRUFBRTtRQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsT0FBTyxFQUFFLCtGQUErRixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDcEosZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQztLQUN4RTtJQUVELE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQXJCRCwyQ0FxQkMifQ==