"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUpgradedForgeDevDeps = void 0;
const path_1 = __importDefault(require("path"));
const init_npm_1 = require("../api/init-scripts/init-npm");
function mapMakeTargets(forge5Config) {
    const makeTargets = new Map();
    if (forge5Config.make_targets) {
        for (const [platform, targets] of Object.entries(forge5Config.make_targets)) {
            for (const target of targets) {
                let platforms = makeTargets.get(target);
                if (platforms === undefined) {
                    platforms = [];
                    makeTargets.set(target, platforms);
                }
                platforms.push(platform);
            }
        }
    }
    return makeTargets;
}
const forge5MakerMappings = new Map([
    ['electronInstallerDebian', 'deb'],
    ['electronInstallerDMG', 'dmg'],
    ['electronInstallerFlatpak', 'flatpak'],
    ['electronInstallerRedhat', 'rpm'],
    ['electronInstallerSnap', 'snap'],
    ['electronWinstallerConfig', 'squirrel'],
    ['electronWixMSIConfig', 'wix'],
    ['windowsStoreConfig', 'appx'],
]);
/**
 * Converts Forge v5 maker config to v6.
 */
function generateForgeMakerConfig(forge5Config) {
    const makeTargets = mapMakeTargets(forge5Config);
    const makers = [];
    for (const [forge5Key, makerType] of forge5MakerMappings) {
        const config = forge5Config[forge5Key];
        if (config) {
            makers.push({
                name: `@electron-forge/maker-${makerType}`,
                config: forge5Config[forge5Key],
                platforms: makeTargets.get(makerType) || [],
            });
        }
    }
    const zipPlatforms = makeTargets.get('zip');
    if (zipPlatforms) {
        makers.push({
            name: '@electron-forge/maker-zip',
            platforms: zipPlatforms,
        });
    }
    return makers;
}
const forge5PublisherMappings = new Map([
    ['github_repository', 'github'],
    ['s3', 's3'],
    ['electron-release-server', 'electron-release-server'],
    ['snapStore', 'snapcraft'],
]);
/**
 * Transforms v5 GitHub publisher config to v6 syntax.
 */
function transformGitHubPublisherConfig(config) {
    const { name, owner, options, ...gitHubConfig } = config;
    gitHubConfig.repository = { name, owner };
    if (options) {
        gitHubConfig.octokitOptions = options;
    }
    return gitHubConfig;
}
/**
 * Converts Forge v5 publisher config to v6.
 */
function generateForgePublisherConfig(forge5Config) {
    const publishers = [];
    for (const [forge5Key, publisherType] of forge5PublisherMappings) {
        let config = forge5Config[forge5Key];
        if (config) {
            if (publisherType === 'github') {
                config = transformGitHubPublisherConfig(config);
            }
            publishers.push({
                config,
                name: `@electron-forge/publisher-${publisherType}`,
                platforms: null,
            });
        }
    }
    return publishers;
}
/**
 * Upgrades Forge v5 config to v6.
 */
function upgradeForgeConfig(forge5Config) {
    const forgeConfig = {};
    if (forge5Config.electronPackagerConfig) {
        delete forge5Config.electronPackagerConfig.packageManager;
        forgeConfig.packagerConfig = forge5Config.electronPackagerConfig;
    }
    if (forge5Config.electronRebuildConfig) {
        forgeConfig.rebuildConfig = forge5Config.electronRebuildConfig;
    }
    forgeConfig.makers = generateForgeMakerConfig(forge5Config);
    forgeConfig.publishers = generateForgePublisherConfig(forge5Config);
    return forgeConfig;
}
exports.default = upgradeForgeConfig;
function updateUpgradedForgeDevDeps(packageJSON, devDeps) {
    const forgeConfig = packageJSON.config.forge;
    devDeps = devDeps.filter((dep) => !dep.startsWith('@electron-forge/maker-'));
    devDeps = devDeps.concat(forgeConfig.makers.map((maker) => (0, init_npm_1.siblingDep)(path_1.default.basename(maker.name))));
    devDeps = devDeps.concat(forgeConfig.publishers.map((publisher) => (0, init_npm_1.siblingDep)(path_1.default.basename(publisher.name))));
    if (Object.keys(packageJSON.devDependencies).find((dep) => dep === 'electron-prebuilt-compile')) {
        devDeps = devDeps.concat((0, init_npm_1.siblingDep)('plugin-compile'));
    }
    return devDeps;
}
exports.updateUpgradedForgeDevDeps = updateUpgradedForgeDevDeps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZS1mb3JnZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC91cGdyYWRlLWZvcmdlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFJeEIsMkRBQTBEO0FBc0MxRCxTQUFTLGNBQWMsQ0FBQyxZQUEwQjtJQUNoRCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztJQUN2RCxJQUFJLFlBQVksQ0FBQyxZQUFZLEVBQUU7UUFDN0IsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQTJCLENBQUMsRUFBRTtZQUMxRixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUMzQixTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNmLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQXlCLENBQUMsQ0FBQzthQUMzQztTQUNGO0tBQ0Y7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsQ0FBMEI7SUFDM0QsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUM7SUFDbEMsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUM7SUFDL0IsQ0FBQywwQkFBMEIsRUFBRSxTQUFTLENBQUM7SUFDdkMsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUM7SUFDbEMsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUM7SUFDakMsQ0FBQywwQkFBMEIsRUFBRSxVQUFVLENBQUM7SUFDeEMsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUM7SUFDL0IsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUM7Q0FDL0IsQ0FBQyxDQUFDO0FBRUg7O0dBRUc7QUFDSCxTQUFTLHdCQUF3QixDQUFDLFlBQTBCO0lBQzFELE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxNQUFNLE1BQU0sR0FBNEIsRUFBRSxDQUFDO0lBRTNDLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxtQkFBbUIsRUFBRTtRQUN4RCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNWLElBQUksRUFBRSx5QkFBeUIsU0FBUyxFQUFFO2dCQUMxQyxNQUFNLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQztnQkFDL0IsU0FBUyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTthQUNuQixDQUFDLENBQUM7U0FDN0I7S0FDRjtJQUVELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsSUFBSSxZQUFZLEVBQUU7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSwyQkFBMkI7WUFDakMsU0FBUyxFQUFFLFlBQVk7U0FDQyxDQUFDLENBQUM7S0FDN0I7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLEdBQUcsQ0FBMEI7SUFDL0QsQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUM7SUFDL0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQ1osQ0FBQyx5QkFBeUIsRUFBRSx5QkFBeUIsQ0FBQztJQUN0RCxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7Q0FDM0IsQ0FBQyxDQUFDO0FBRUg7O0dBRUc7QUFDSCxTQUFTLDhCQUE4QixDQUFDLE1BQXFCO0lBQzNELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLFlBQVksRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUN6RCxZQUFZLENBQUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzFDLElBQUksT0FBTyxFQUFFO1FBQ1gsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDdkM7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLDRCQUE0QixDQUFDLFlBQTBCO0lBQzlELE1BQU0sVUFBVSxHQUFnQyxFQUFFLENBQUM7SUFFbkQsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxJQUFJLHVCQUF1QixFQUFFO1FBQ2hFLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksYUFBYSxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsTUFBTSxHQUFHLDhCQUE4QixDQUFDLE1BQXVCLENBQUMsQ0FBQzthQUNsRTtZQUNELFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsTUFBTTtnQkFDTixJQUFJLEVBQUUsNkJBQTZCLGFBQWEsRUFBRTtnQkFDbEQsU0FBUyxFQUFFLElBQUk7YUFDUyxDQUFDLENBQUM7U0FDN0I7S0FDRjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQXdCLGtCQUFrQixDQUFDLFlBQTBCO0lBQ25FLE1BQU0sV0FBVyxHQUFnQixFQUFpQixDQUFDO0lBRW5ELElBQUksWUFBWSxDQUFDLHNCQUFzQixFQUFFO1FBQ3ZDLE9BQU8sWUFBWSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztRQUMxRCxXQUFXLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztLQUNsRTtJQUNELElBQUksWUFBWSxDQUFDLHFCQUFxQixFQUFFO1FBQ3RDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixDQUFDO0tBQ2hFO0lBQ0QsV0FBVyxDQUFDLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxXQUFXLENBQUMsVUFBVSxHQUFHLDRCQUE0QixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXBFLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFkRCxxQ0FjQztBQUVELFNBQWdCLDBCQUEwQixDQUFDLFdBQTZCLEVBQUUsT0FBaUI7SUFDekYsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDN0MsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7SUFDN0UsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUUsV0FBVyxDQUFDLE1BQWtDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBNEIsRUFBRSxFQUFFLENBQUMsSUFBQSxxQkFBVSxFQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZKLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUNyQixXQUFXLENBQUMsVUFBMEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFvQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHFCQUFVLEVBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNqSixDQUFDO0lBRUYsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSywyQkFBMkIsQ0FBQyxFQUFFO1FBQ3ZHLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUEscUJBQVUsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBYkQsZ0VBYUMifQ==