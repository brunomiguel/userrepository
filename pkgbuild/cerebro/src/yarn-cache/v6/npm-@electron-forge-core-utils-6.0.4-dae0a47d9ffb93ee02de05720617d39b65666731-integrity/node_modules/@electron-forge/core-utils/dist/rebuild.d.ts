import { ForgeArch, ForgeListrTask, ForgePlatform } from '@electron-forge/shared-types';
import { RebuildOptions } from '@electron/rebuild';
export declare const listrCompatibleRebuildHook: (buildPath: string, electronVersion: string, platform: ForgePlatform, arch: ForgeArch, config: Partial<RebuildOptions> | undefined, task: ForgeListrTask<never>, taskTitlePrefix?: string) => Promise<void>;
//# sourceMappingURL=rebuild.d.ts.map