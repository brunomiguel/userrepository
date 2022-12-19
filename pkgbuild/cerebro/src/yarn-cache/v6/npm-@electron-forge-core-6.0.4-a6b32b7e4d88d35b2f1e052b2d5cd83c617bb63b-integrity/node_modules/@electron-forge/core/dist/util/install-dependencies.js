"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepVersionRestriction = exports.DepType = void 0;
const core_utils_1 = require("@electron-forge/core-utils");
const cross_spawn_promise_1 = require("@malept/cross-spawn-promise");
const debug_1 = __importDefault(require("debug"));
const d = (0, debug_1.default)('electron-forge:dependency-installer');
var DepType;
(function (DepType) {
    DepType["PROD"] = "PROD";
    DepType["DEV"] = "DEV";
})(DepType = exports.DepType || (exports.DepType = {}));
var DepVersionRestriction;
(function (DepVersionRestriction) {
    DepVersionRestriction["EXACT"] = "EXACT";
    DepVersionRestriction["RANGE"] = "RANGE";
})(DepVersionRestriction = exports.DepVersionRestriction || (exports.DepVersionRestriction = {}));
exports.default = async (dir, deps, depType = DepType.PROD, versionRestriction = DepVersionRestriction.RANGE) => {
    d('installing', JSON.stringify(deps), 'in:', dir, `depType=${depType},versionRestriction=${versionRestriction},withYarn=${(0, core_utils_1.hasYarn)()}`);
    if (deps.length === 0) {
        d('nothing to install, stopping immediately');
        return Promise.resolve();
    }
    let cmd = ['install'].concat(deps);
    if ((0, core_utils_1.hasYarn)()) {
        cmd = ['add'].concat(deps);
        if (depType === DepType.DEV)
            cmd.push('--dev');
        if (versionRestriction === DepVersionRestriction.EXACT)
            cmd.push('--exact');
    }
    else {
        if (versionRestriction === DepVersionRestriction.EXACT)
            cmd.push('--save-exact');
        if (depType === DepType.DEV)
            cmd.push('--save-dev');
        if (depType === DepType.PROD)
            cmd.push('--save');
    }
    d('executing', JSON.stringify(cmd), 'in:', dir);
    try {
        await (0, core_utils_1.yarnOrNpmSpawn)(cmd, {
            cwd: dir,
            stdio: 'pipe',
        });
    }
    catch (err) {
        if (err instanceof cross_spawn_promise_1.ExitError) {
            throw new Error(`Failed to install modules: ${JSON.stringify(deps)}\n\nWith output: ${err.message}\n${err.stderr ? err.stderr.toString() : ''}`);
        }
        else {
            throw err;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC1kZXBlbmRlbmNpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9pbnN0YWxsLWRlcGVuZGVuY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyREFBcUU7QUFDckUscUVBQXdEO0FBQ3hELGtEQUEwQjtBQUUxQixNQUFNLENBQUMsR0FBRyxJQUFBLGVBQUssRUFBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBRXZELElBQVksT0FHWDtBQUhELFdBQVksT0FBTztJQUNqQix3QkFBYSxDQUFBO0lBQ2Isc0JBQVcsQ0FBQTtBQUNiLENBQUMsRUFIVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFHbEI7QUFFRCxJQUFZLHFCQUdYO0FBSEQsV0FBWSxxQkFBcUI7SUFDL0Isd0NBQWUsQ0FBQTtJQUNmLHdDQUFlLENBQUE7QUFDakIsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR2hDO0FBRUQsa0JBQWUsS0FBSyxFQUFFLEdBQVcsRUFBRSxJQUFjLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsS0FBSyxFQUFpQixFQUFFO0lBQzVJLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsT0FBTyx1QkFBdUIsa0JBQWtCLGFBQWEsSUFBQSxvQkFBTyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDckIsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDMUI7SUFDRCxJQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLElBQUEsb0JBQU8sR0FBRSxFQUFFO1FBQ2IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksT0FBTyxLQUFLLE9BQU8sQ0FBQyxHQUFHO1lBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLGtCQUFrQixLQUFLLHFCQUFxQixDQUFDLEtBQUs7WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdFO1NBQU07UUFDTCxJQUFJLGtCQUFrQixLQUFLLHFCQUFxQixDQUFDLEtBQUs7WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksT0FBTyxLQUFLLE9BQU8sQ0FBQyxHQUFHO1lBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsSUFBSTtZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbEQ7SUFDRCxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELElBQUk7UUFDRixNQUFNLElBQUEsMkJBQWMsRUFBQyxHQUFHLEVBQUU7WUFDeEIsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLEdBQUcsWUFBWSwrQkFBUyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEo7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFDO1NBQ1g7S0FDRjtBQUNILENBQUMsQ0FBQyJ9