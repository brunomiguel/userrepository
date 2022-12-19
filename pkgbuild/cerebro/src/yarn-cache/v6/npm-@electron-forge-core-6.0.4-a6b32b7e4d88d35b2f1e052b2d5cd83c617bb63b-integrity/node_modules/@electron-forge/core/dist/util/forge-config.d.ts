import { ForgeConfig, ResolvedForgeConfig } from '@electron-forge/shared-types';
export declare type BuildIdentifierMap<T> = Record<string, T | undefined>;
export declare type BuildIdentifierConfig<T> = {
    map: BuildIdentifierMap<T>;
    __isMagicBuildIdentifierMap: true;
};
export declare function fromBuildIdentifier<T>(map: BuildIdentifierMap<T>): BuildIdentifierConfig<T>;
export declare function forgeConfigIsValidFilePath(dir: string, forgeConfig: string | ForgeConfig): Promise<boolean>;
export declare function renderConfigTemplate(dir: string, templateObj: any, obj: any): void;
declare const _default: (dir: string) => Promise<ResolvedForgeConfig>;
export default _default;
//# sourceMappingURL=forge-config.d.ts.map