"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNPM = exports.exactDevDeps = exports.devDeps = exports.deps = exports.siblingDep = void 0;
const path_1 = __importDefault(require("path"));
const core_utils_1 = require("@electron-forge/core-utils");
const debug_1 = __importDefault(require("debug"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const install_dependencies_1 = __importStar(require("../../util/install-dependencies"));
const read_package_json_1 = require("../../util/read-package-json");
const d = (0, debug_1.default)('electron-forge:init:npm');
const corePackage = fs_extra_1.default.readJsonSync(path_1.default.resolve(__dirname, '../../../package.json'));
function siblingDep(name) {
    return `@electron-forge/${name}@^${corePackage.version}`;
}
exports.siblingDep = siblingDep;
exports.deps = ['electron-squirrel-startup'];
exports.devDeps = [siblingDep('cli'), siblingDep('maker-squirrel'), siblingDep('maker-zip'), siblingDep('maker-deb'), siblingDep('maker-rpm')];
exports.exactDevDeps = ['electron'];
const initNPM = async (dir, task) => {
    d('installing dependencies');
    const packageManager = (0, core_utils_1.safeYarnOrNpm)();
    task.output = `${packageManager} install ${exports.deps.join(' ')}`;
    await (0, install_dependencies_1.default)(dir, exports.deps);
    d('installing devDependencies');
    task.output = `${packageManager} install --dev ${exports.deps.join(' ')}`;
    await (0, install_dependencies_1.default)(dir, exports.devDeps, install_dependencies_1.DepType.DEV);
    d('installing exact devDependencies');
    for (const packageName of exports.exactDevDeps) {
        task.output = `${packageManager} install --dev --exact ${packageName}`;
        await (0, install_dependencies_1.default)(dir, [packageName], install_dependencies_1.DepType.DEV, install_dependencies_1.DepVersionRestriction.EXACT);
    }
    // This logic allows developers working on forge itself to easily init
    // a local template and have it use their local plugins / core / cli packages
    if (process.env.LINK_FORGE_DEPENDENCIES_ON_INIT) {
        const packageJson = await (0, read_package_json_1.readRawPackageJson)(dir);
        const linkFolder = path_1.default.resolve(__dirname, '..', '..', '..', '..', '..', '..', '.links');
        for (const packageName of Object.keys(packageJson.devDependencies)) {
            if (packageName.startsWith('@electron-forge/')) {
                task.output = `${packageManager} link --link-folder ${linkFolder} ${packageName}`;
                await (0, core_utils_1.yarnOrNpmSpawn)(['link', '--link-folder', linkFolder, packageName], {
                    cwd: dir,
                });
            }
        }
    }
};
exports.initNPM = initNPM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1ucG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL2luaXQtc2NyaXB0cy9pbml0LW5wbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QjtBQUV4QiwyREFBMkU7QUFFM0Usa0RBQTBCO0FBQzFCLHdEQUEwQjtBQUUxQix3RkFBaUc7QUFDakcsb0VBQWtFO0FBRWxFLE1BQU0sQ0FBQyxHQUFHLElBQUEsZUFBSyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDM0MsTUFBTSxXQUFXLEdBQUcsa0JBQUUsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0FBRXRGLFNBQWdCLFVBQVUsQ0FBQyxJQUFZO0lBQ3JDLE9BQU8sbUJBQW1CLElBQUksS0FBSyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0QsQ0FBQztBQUZELGdDQUVDO0FBRVksUUFBQSxJQUFJLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3JDLFFBQUEsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDdkksUUFBQSxZQUFZLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVsQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsR0FBVyxFQUFFLElBQXlCLEVBQWlCLEVBQUU7SUFDckYsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0IsTUFBTSxjQUFjLEdBQUcsSUFBQSwwQkFBYSxHQUFFLENBQUM7SUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLGNBQWMsWUFBWSxZQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDNUQsTUFBTSxJQUFBLDhCQUFjLEVBQUMsR0FBRyxFQUFFLFlBQUksQ0FBQyxDQUFDO0lBRWhDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxjQUFjLGtCQUFrQixZQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDbEUsTUFBTSxJQUFBLDhCQUFjLEVBQUMsR0FBRyxFQUFFLGVBQU8sRUFBRSw4QkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhELENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3RDLEtBQUssTUFBTSxXQUFXLElBQUksb0JBQVksRUFBRTtRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsY0FBYywwQkFBMEIsV0FBVyxFQUFFLENBQUM7UUFDdkUsTUFBTSxJQUFBLDhCQUFjLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsOEJBQU8sQ0FBQyxHQUFHLEVBQUUsNENBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEY7SUFFRCxzRUFBc0U7SUFDdEUsNkVBQTZFO0lBQzdFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRTtRQUMvQyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUEsc0NBQWtCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekYsS0FBSyxNQUFNLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNsRSxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLGNBQWMsdUJBQXVCLFVBQVUsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDbEYsTUFBTSxJQUFBLDJCQUFjLEVBQUMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsRUFBRTtvQkFDdkUsR0FBRyxFQUFFLEdBQUc7aUJBQ1QsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBOUJXLFFBQUEsT0FBTyxXQThCbEIifQ==