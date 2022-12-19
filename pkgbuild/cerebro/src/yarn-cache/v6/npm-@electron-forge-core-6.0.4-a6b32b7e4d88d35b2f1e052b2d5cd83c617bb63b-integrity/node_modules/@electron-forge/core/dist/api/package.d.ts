import { ForgeArch, ForgePlatform, ResolvedForgeConfig } from '@electron-forge/shared-types';
import { TargetDefinition } from 'electron-packager';
import { Listr } from 'listr2';
declare type PackageContext = {
    dir: string;
    forgeConfig: ResolvedForgeConfig;
    packageJSON: any;
    calculatedOutDir: string;
    packagerPromise: Promise<string[]>;
    targets: InternalTargetDefinition[];
};
declare type InternalTargetDefinition = TargetDefinition & {
    forUniversal?: boolean;
};
declare type PackageResult = TargetDefinition & {
    packagedPath: string;
};
export interface PackageOptions {
    /**
     * The path to the app to package
     */
    dir?: string;
    /**
     * Whether to use sensible defaults or prompt the user visually
     */
    interactive?: boolean;
    /**
     * The target arch
     */
    arch?: ForgeArch;
    /**
     * The target platform.
     */
    platform?: ForgePlatform;
    /**
     * The path to the output directory for packaged apps
     */
    outDir?: string;
}
export declare const listrPackage: ({ dir: providedDir, interactive, arch, platform, outDir, }: PackageOptions) => Listr<PackageContext, "default", "verbose">;
declare const _default: (opts: PackageOptions) => Promise<PackageResult[]>;
export default _default;
//# sourceMappingURL=package.d.ts.map