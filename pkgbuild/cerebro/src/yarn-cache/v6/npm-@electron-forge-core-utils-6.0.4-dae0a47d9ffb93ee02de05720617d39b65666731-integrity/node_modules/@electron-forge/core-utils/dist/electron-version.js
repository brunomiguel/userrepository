"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateElectronDependency = exports.getElectronVersion = exports.getElectronModulePath = exports.PackageNotFoundError = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const find_up_1 = __importDefault(require("find-up"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const semver_1 = __importDefault(require("semver"));
const yarn_or_npm_1 = require("./yarn-or-npm");
const d = (0, debug_1.default)('electron-forge:electron-version');
const electronPackageNames = ['electron-prebuilt-compile', 'electron-prebuilt', 'electron-nightly', 'electron'];
function findElectronDep(dep) {
    return electronPackageNames.includes(dep);
}
async function findAncestorNodeModulesPath(dir, packageName) {
    d('Looking for a lock file to indicate the root of the repo');
    const lockPath = await (0, find_up_1.default)(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'], { cwd: dir, type: 'file' });
    if (lockPath) {
        d(`Found lock file: ${lockPath}`);
        const nodeModulesPath = path_1.default.join(path_1.default.dirname(lockPath), 'node_modules', packageName);
        if (await fs_extra_1.default.pathExists(nodeModulesPath)) {
            return nodeModulesPath;
        }
    }
    return Promise.resolve(undefined);
}
async function determineNodeModulesPath(dir, packageName) {
    const nodeModulesPath = path_1.default.join(dir, 'node_modules', packageName);
    if (await fs_extra_1.default.pathExists(nodeModulesPath)) {
        return nodeModulesPath;
    }
    return findAncestorNodeModulesPath(dir, packageName);
}
class PackageNotFoundError extends Error {
    constructor(packageName, dir) {
        super(`Cannot find the package "${packageName}". Perhaps you need to run "${(0, yarn_or_npm_1.safeYarnOrNpm)()} install" in "${dir}"?`);
    }
}
exports.PackageNotFoundError = PackageNotFoundError;
function getElectronModuleName(packageJSON) {
    if (!packageJSON.devDependencies) {
        throw new Error('package.json for app does not have any devDependencies');
    }
    // Why: checked above
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const packageName = electronPackageNames.find((pkg) => packageJSON.devDependencies[pkg]);
    if (packageName === undefined) {
        throw new Error('Could not find any Electron packages in devDependencies');
    }
    return packageName;
}
async function getElectronPackageJSONPath(dir, packageName) {
    const nodeModulesPath = await determineNodeModulesPath(dir, packageName);
    if (!nodeModulesPath) {
        throw new PackageNotFoundError(packageName, dir);
    }
    const electronPackageJSONPath = path_1.default.join(nodeModulesPath, 'package.json');
    if (await fs_extra_1.default.pathExists(electronPackageJSONPath)) {
        return electronPackageJSONPath;
    }
    return undefined;
}
async function getElectronModulePath(dir, packageJSON) {
    const moduleName = getElectronModuleName(packageJSON);
    const packageJSONPath = await getElectronPackageJSONPath(dir, moduleName);
    if (packageJSONPath) {
        return path_1.default.dirname(packageJSONPath);
    }
    return undefined;
}
exports.getElectronModulePath = getElectronModulePath;
async function getElectronVersion(dir, packageJSON) {
    const packageName = getElectronModuleName(packageJSON);
    // Why: checked in getElectronModuleName
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let version = packageJSON.devDependencies[packageName];
    if (!semver_1.default.valid(version)) {
        // It's not an exact version, find it in the actual module
        const electronPackageJSONPath = await getElectronPackageJSONPath(dir, packageName);
        if (electronPackageJSONPath) {
            const electronPackageJSON = await fs_extra_1.default.readJson(electronPackageJSONPath);
            version = electronPackageJSON.version;
        }
        else {
            throw new PackageNotFoundError(packageName, dir);
        }
    }
    return version;
}
exports.getElectronVersion = getElectronVersion;
function updateElectronDependency(packageJSON, dev, exact) {
    const alteredDev = [].concat(dev);
    let alteredExact = [].concat(exact);
    // Why: checked in getElectronModuleName
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (Object.keys(packageJSON.devDependencies).find(findElectronDep)) {
        alteredExact = alteredExact.filter((dep) => dep !== 'electron');
    }
    else if (packageJSON.dependencies) {
        const electronKey = Object.keys(packageJSON.dependencies).find(findElectronDep);
        if (electronKey) {
            alteredExact = alteredExact.filter((dep) => dep !== 'electron');
            d(`Moving ${electronKey} from dependencies to devDependencies`);
            alteredDev.push(`${electronKey}@${packageJSON.dependencies[electronKey]}`);
            delete packageJSON.dependencies[electronKey];
        }
    }
    return [alteredDev, alteredExact];
}
exports.updateElectronDependency = updateElectronDependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24tdmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbGVjdHJvbi12ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUV4QixrREFBMEI7QUFDMUIsc0RBQTZCO0FBQzdCLHdEQUEwQjtBQUMxQixvREFBNEI7QUFFNUIsK0NBQThDO0FBRTlDLE1BQU0sQ0FBQyxHQUFHLElBQUEsZUFBSyxFQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFFbkQsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLDJCQUEyQixFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBT2hILFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDbEMsT0FBTyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxHQUFXLEVBQUUsV0FBbUI7SUFDekUsQ0FBQyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7SUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLGlCQUFNLEVBQUMsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEgsSUFBSSxRQUFRLEVBQUU7UUFDWixDQUFDLENBQUMsb0JBQW9CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEMsTUFBTSxlQUFlLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2RixJQUFJLE1BQU0sa0JBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxlQUFlLENBQUM7U0FDeEI7S0FDRjtJQUVELE9BQU8sT0FB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