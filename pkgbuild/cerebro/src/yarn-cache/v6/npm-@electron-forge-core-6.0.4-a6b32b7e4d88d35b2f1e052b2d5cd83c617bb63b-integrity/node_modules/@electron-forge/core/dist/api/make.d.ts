import { MakerBase } from '@electron-forge/maker-base';
import { ForgeArch, ForgeConfigMaker, ForgeMakeResult, ForgePlatform, ResolvedForgeConfig } from '@electron-forge/shared-types';
import { Listr } from 'listr2';
declare type MakeTargets = ForgeConfigMaker[] | string[];
declare type MakeContext = {
    dir: string;
    forgeConfig: ResolvedForgeConfig;
    actualOutDir: string;
    makers: MakerBase<unknown>[];
    outputs: ForgeMakeResult[];
};
export interface MakeOptions {
    /**
     * The path to the app from which distrubutables are generated
     */
    dir?: string;
    /**
     * Whether to use sensible defaults or prompt the user visually
     */
    interactive?: boolean;
    /**
     * Whether to skip the pre-make packaging step
     */
    skipPackage?: boolean;
    /**
     * An array of make targets to override your forge config
     */
    overrideTargets?: MakeTargets;
    /**
     * The target architecture
     */
    arch?: ForgeArch;
    /**
     * The target platform
     */
    platform?: ForgePlatform;
    /**
     * The path to the directory containing generated distributables
     */
    outDir?: string;
}
export declare const listrMake: ({ dir: providedDir, interactive, skipPackage, arch, platform, overrideTargets, outDir, }: MakeOptions, receiveMakeResults?: ((results: ForgeMakeResult[]) => void) | undefined) => Listr<MakeContext, "default", "verbose">;
declare const make: (opts: MakeOptions) => Promise<ForgeMakeResult[]>;
export default make;
//# sourceMappingURL=make.d.ts.map