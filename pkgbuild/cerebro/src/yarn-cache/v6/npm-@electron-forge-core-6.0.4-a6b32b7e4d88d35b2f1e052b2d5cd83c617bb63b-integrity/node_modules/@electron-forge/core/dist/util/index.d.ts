import { getElectronVersion } from '@electron-forge/core-utils';
import { BuildIdentifierConfig, BuildIdentifierMap } from './forge-config';
export default class ForgeUtils {
    /**
     * Helper for creating a dynamic config value that will get its real value
     * based on the "buildIdentifier" in your Forge config.
     *
     * Usage:
     * `fromBuildIdentifier({ stable: 'App', beta: 'App Beta' })`
     */
    fromBuildIdentifier<T>(map: BuildIdentifierMap<T>): BuildIdentifierConfig<T>;
    getElectronVersion: typeof getElectronVersion;
    hasYarn: () => boolean;
    yarnOrNpmSpawn: (args?: import("@malept/cross-spawn-promise").CrossSpawnArgs, opts?: import("@malept/cross-spawn-promise").CrossSpawnOptions | undefined) => Promise<string>;
}
//# sourceMappingURL=index.d.ts.map