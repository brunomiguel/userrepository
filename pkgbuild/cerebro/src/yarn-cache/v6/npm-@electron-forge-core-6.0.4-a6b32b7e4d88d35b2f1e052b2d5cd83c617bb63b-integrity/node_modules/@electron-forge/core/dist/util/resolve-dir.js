"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core_utils_1 = require("@electron-forge/core-utils");
const debug_1 = __importDefault(require("debug"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const read_package_json_1 = require("./read-package-json");
const d = (0, debug_1.default)('electron-forge:project-resolver');
// FIXME: If we want getElectronVersion to be overridable by plugins
//        and / or forge config then we need to be able to resolve
//        the dir without calling getElectronVersion
exports.default = async (dir) => {
    var _a;
    let mDir = dir;
    let bestGuessDir = null;
    let lastError = null;
    let prevDir;
    while (prevDir !== mDir) {
        prevDir = mDir;
        const testPath = path_1.default.resolve(mDir, 'package.json');
        d('searching for project in:', mDir);
        if (await fs_extra_1.default.pathExists(testPath)) {
            const packageJSON = await (0, read_package_json_1.readRawPackageJson)(mDir);
            // TODO: Move this check to inside the forge config resolver and use
            //       mutatedPackageJson reader
            try {
                await (0, core_utils_1.getElectronVersion)(mDir, packageJSON);
            }
            catch (err) {
                if (err instanceof Error) {
                    lastError = err.message;
                }
            }
            if (packageJSON.config && packageJSON.config.forge) {
                d('electron-forge compatible package.json found in', testPath);
                return mDir;
            }
            if ((_a = packageJSON.devDependencies) === null || _a === void 0 ? void 0 : _a['@electron-forge/cli']) {
                d('package.json with forge dependency found in', testPath);
                return mDir;
            }
            bestGuessDir = mDir;
        }
        mDir = path_1.default.dirname(mDir);
    }
    if (bestGuessDir) {
        d('guessing on the best electron-forge package.json found in', bestGuessDir);
        return bestGuessDir;
    }
    if (lastError) {
        throw new Error(lastError);
    }
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS1kaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9yZXNvbHZlLWRpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUV4QiwyREFBZ0U7QUFDaEUsa0RBQTBCO0FBQzFCLHdEQUEwQjtBQUUxQiwyREFBeUQ7QUFFekQsTUFBTSxDQUFDLEdBQUcsSUFBQSxlQUFLLEVBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUVuRCxvRUFBb0U7QUFDcEUsa0VBQWtFO0FBQ2xFLG9EQUFvRDtBQUNwRCxrQkFBZSxLQUFLLEVBQUUsR0FBVyxFQUEwQixFQUFFOztJQUMzRCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7SUFDZixJQUFJLFlBQVksR0FBa0IsSUFBSSxDQUFDO0lBQ3ZDLElBQUksU0FBUyxHQUFrQixJQUFJLENBQUM7SUFFcEMsSUFBSSxPQUFPLENBQUM7SUFDWixPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLE1BQU0sa0JBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHNDQUFrQixFQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5ELG9FQUFvRTtZQUNwRSxrQ0FBa0M7WUFDbEMsSUFBSTtnQkFDRixNQUFNLElBQUEsK0JBQWtCLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzdDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO29CQUN4QixTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztpQkFDekI7YUFDRjtZQUVELElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDbEQsQ0FBQyxDQUFDLGlEQUFpRCxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxNQUFBLFdBQVcsQ0FBQyxlQUFlLDBDQUFHLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ3hELENBQUMsQ0FBQyw2Q0FBNkMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELFlBQVksR0FBRyxJQUFJLENBQUM7U0FDckI7UUFDRCxJQUFJLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtJQUNELElBQUksWUFBWSxFQUFFO1FBQ2hCLENBQUMsQ0FBQywyREFBMkQsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RSxPQUFPLFlBQVksQ0FBQztLQUNyQjtJQUNELElBQUksU0FBUyxFQUFFO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDIn0=