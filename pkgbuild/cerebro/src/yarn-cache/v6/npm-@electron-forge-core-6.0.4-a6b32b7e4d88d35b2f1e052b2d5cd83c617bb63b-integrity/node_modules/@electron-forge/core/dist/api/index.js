"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.api = exports.ForgeUtils = exports.ForgeAPI = void 0;
const util_1 = __importDefault(require("../util"));
exports.ForgeUtils = util_1.default;
const import_1 = __importDefault(require("./import"));
const init_1 = __importDefault(require("./init"));
const make_1 = __importDefault(require("./make"));
const package_1 = __importDefault(require("./package"));
const publish_1 = __importDefault(require("./publish"));
const start_1 = __importDefault(require("./start"));
class ForgeAPI {
    /**
     * Attempt to import a given module directory to the Electron Forge standard.
     *
     * * Sets up `git` and the correct NPM dependencies
     * * Adds a template forge config to `package.json`
     */
    import(opts) {
        return (0, import_1.default)(opts);
    }
    /**
     * Initialize a new Electron Forge template project in the given directory.
     */
    init(opts) {
        return (0, init_1.default)(opts);
    }
    /**
     * Make distributables for an Electron application
     */
    make(opts) {
        return (0, make_1.default)(opts);
    }
    /**
     * Resolves hooks if they are a path to a file (instead of a `Function`)
     */
    async package(opts) {
        await (0, package_1.default)(opts);
    }
    /**
     * Publish an Electron application into the given target service
     */
    publish(opts) {
        return (0, publish_1.default)(opts);
    }
    /**
     * Start an Electron application.
     *
     * Handles things like native module rebuilding for you on the fly
     */
    start(opts) {
        return (0, start_1.default)(opts);
    }
}
exports.ForgeAPI = ForgeAPI;
const api = new ForgeAPI();
exports.api = api;
const utils = new util_1.default();
exports.utils = utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLG1EQUFpQztBQTZEVSxxQkE3RHBDLGNBQVUsQ0E2RG9DO0FBM0RyRCxzREFBa0Q7QUFDbEQsa0RBQTJDO0FBQzNDLGtEQUEyQztBQUMzQyx3REFBcUQ7QUFDckQsd0RBQW9EO0FBQ3BELG9EQUE4QztBQUU5QyxNQUFhLFFBQVE7SUFDbkI7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsSUFBbUI7UUFDeEIsT0FBTyxJQUFBLGdCQUFPLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLElBQWlCO1FBQ3BCLE9BQU8sSUFBQSxjQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLElBQWlCO1FBQ3BCLE9BQU8sSUFBQSxjQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFvQjtRQUNoQyxNQUFNLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsSUFBb0I7UUFDMUIsT0FBTyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsSUFBa0I7UUFDdEIsT0FBTyxJQUFBLGVBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUEvQ0QsNEJBK0NDO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztBQUdtSCxrQkFBRztBQUZqSixNQUFNLEtBQUssR0FBRyxJQUFJLGNBQVUsRUFBRSxDQUFDO0FBRW9ILHNCQUFLIn0=