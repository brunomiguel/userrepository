"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSearchRaw = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const d = (0, debug_1.default)('electron-forge:require-search');
function requireSearchRaw(relativeTo, paths) {
    // Attempt to locally short-circuit if we're running from a checkout of forge
    if (__dirname.includes('forge/packages/api/core/') && paths.length === 1 && paths[0].startsWith('@electron-forge/')) {
        const [moduleType, moduleName] = paths[0].split('/')[1].split('-');
        try {
            const localPath = path_1.default.resolve(__dirname, '..', '..', '..', '..', moduleType, moduleName);
            d('testing local forge build', { moduleType, moduleName, localPath });
            return require(localPath);
        }
        catch {
            // Ignore
        }
    }
    // Load via normal search paths
    const testPaths = paths
        .concat(paths.map((mapPath) => path_1.default.resolve(relativeTo, mapPath)))
        .concat(paths.map((mapPath) => path_1.default.resolve(relativeTo, 'node_modules', mapPath)));
    d('searching', testPaths, 'relative to', relativeTo);
    for (const testPath of testPaths) {
        try {
            d('testing', testPath);
            return require(testPath);
        }
        catch (err) {
            if (err instanceof Error) {
                const requireErr = err;
                // Ignore require-related errors
                if (requireErr.code !== 'MODULE_NOT_FOUND' || ![undefined, testPath].includes(requireErr.requestPath)) {
                    throw err;
                }
            }
        }
    }
    d('failed to find a module in', testPaths);
    return null;
}
exports.requireSearchRaw = requireSearchRaw;
exports.default = (relativeTo, paths) => {
    const result = requireSearchRaw(relativeTo, paths);
    return typeof result === 'object' && result && result.default ? result.default : result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1zZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9yZXF1aXJlLXNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFFeEIsa0RBQTBCO0FBRTFCLE1BQU0sQ0FBQyxHQUFHLElBQUEsZUFBSyxFQUFDLCtCQUErQixDQUFDLENBQUM7QUFTakQsU0FBZ0IsZ0JBQWdCLENBQUksVUFBa0IsRUFBRSxLQUFlO0lBQ3JFLDZFQUE2RTtJQUM3RSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDbkgsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRSxJQUFJO1lBQ0YsTUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDdEUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0I7UUFBQyxNQUFNO1lBQ04sU0FBUztTQUNWO0tBQ0Y7SUFFRCwrQkFBK0I7SUFDL0IsTUFBTSxTQUFTLEdBQUcsS0FBSztTQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckQsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDaEMsSUFBSTtZQUNGLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdkIsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDeEIsTUFBTSxVQUFVLEdBQUcsR0FBbUIsQ0FBQztnQkFDdkMsZ0NBQWdDO2dCQUNoQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUNyRyxNQUFNLEdBQUcsQ0FBQztpQkFDWDthQUNGO1NBQ0Y7S0FDRjtJQUNELENBQUMsQ0FBQyw0QkFBNEIsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFsQ0QsNENBa0NDO0FBTUQsa0JBQWUsQ0FBSSxVQUFrQixFQUFFLEtBQWUsRUFBWSxFQUFFO0lBQ2xFLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFvQixVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEUsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFFLE1BQW1CLENBQUM7QUFDeEcsQ0FBQyxDQUFDIn0=