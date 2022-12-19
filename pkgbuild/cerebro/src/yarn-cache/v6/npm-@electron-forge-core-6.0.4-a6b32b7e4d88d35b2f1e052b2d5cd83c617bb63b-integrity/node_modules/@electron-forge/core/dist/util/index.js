"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@electron-forge/core-utils");
const forge_config_1 = require("./forge-config");
class ForgeUtils {
    constructor() {
        this.getElectronVersion = core_utils_1.getElectronVersion;
        this.hasYarn = core_utils_1.hasYarn;
        this.yarnOrNpmSpawn = core_utils_1.yarnOrNpmSpawn;
    }
    /**
     * Helper for creating a dynamic config value that will get its real value
     * based on the "buildIdentifier" in your Forge config.
     *
     * Usage:
     * `fromBuildIdentifier({ stable: 'App', beta: 'App Beta' })`
     */
    fromBuildIdentifier(map) {
        return (0, forge_config_1.fromBuildIdentifier)(map);
    }
}
exports.default = ForgeUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUF5RjtBQUV6RixpREFBZ0c7QUFFaEcsTUFBcUIsVUFBVTtJQUEvQjtRQVlFLHVCQUFrQixHQUFHLCtCQUFrQixDQUFDO1FBRXhDLFlBQU8sR0FBRyxvQkFBTyxDQUFDO1FBRWxCLG1CQUFjLEdBQUcsMkJBQWMsQ0FBQztJQUNsQyxDQUFDO0lBaEJDOzs7Ozs7T0FNRztJQUNILG1CQUFtQixDQUFJLEdBQTBCO1FBQy9DLE9BQU8sSUFBQSxrQ0FBbUIsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBT0Y7QUFqQkQsNkJBaUJDIn0=