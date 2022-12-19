import { CrossSpawnArgs, CrossSpawnOptions } from '@malept/cross-spawn-promise';
export declare const safeYarnOrNpm: () => "yarn" | "npm";
export declare const yarnOrNpmSpawn: (args?: CrossSpawnArgs, opts?: CrossSpawnOptions | undefined) => Promise<string>;
export declare const hasYarn: () => boolean;
//# sourceMappingURL=yarn-or-npm.d.ts.map