import { ForgeConfig, ForgePlatform } from '@electron-forge/shared-types';
declare type GitHub5Config = Record<string, unknown> & {
    name: string;
    owner: string;
    options: Record<string, unknown>;
};
declare type Forge5Config = {
    make_targets?: Record<ForgePlatform, string[]>;
    electronPackagerConfig?: Record<string, unknown>;
    electronRebuildConfig?: Record<string, unknown>;
    electronWinstallerConfig?: Record<string, unknown>;
    electronInstallerDMG?: Record<string, unknown>;
    electronInstallerFlatpak?: Record<string, unknown>;
    electronInstallerDebian?: Record<string, unknown>;
    electronInstallerRedhat?: Record<string, unknown>;
    electronInstallerSnap?: Record<string, unknown>;
    electronWixMSIConfig?: Record<string, unknown>;
    windowsStoreConfig?: Record<string, unknown>;
    github_repository?: GitHub5Config;
    s3?: Record<string, unknown>;
    'electron-release-server'?: Record<string, unknown>;
    snapStore?: Record<string, unknown>;
};
declare type ForgePackageJSON = Record<string, unknown> & {
    config: {
        forge: ForgeConfig;
    };
    devDependencies: Record<string, string>;
};
/**
 * Upgrades Forge v5 config to v6.
 */
export default function upgradeForgeConfig(forge5Config: Forge5Config): ForgeConfig;
export declare function updateUpgradedForgeDevDeps(packageJSON: ForgePackageJSON, devDeps: string[]): string[];
export {};
//# sourceMappingURL=upgrade-forge-config.d.ts.map