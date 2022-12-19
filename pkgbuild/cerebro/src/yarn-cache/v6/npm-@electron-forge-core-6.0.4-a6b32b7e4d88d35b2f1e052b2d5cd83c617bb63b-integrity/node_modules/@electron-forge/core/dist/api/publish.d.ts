import { ForgeConfigPublisher } from '@electron-forge/shared-types';
import { MakeOptions } from './make';
export interface PublishOptions {
    /**
     * The path to the app to be published
     */
    dir?: string;
    /**
     * Whether to use sensible defaults or prompt the user visually
     */
    interactive?: boolean;
    /**
     * The publish targets, by default pulled from forge config, set this prop to
     * override that list
     */
    publishTargets?: ForgeConfigPublisher[] | string[];
    /**
     * Options object to passed through to make()
     */
    makeOptions?: MakeOptions;
    /**
     * The path to the directory containing generated distributables
     */
    outDir?: string;
    /**
     * Whether to generate dry run meta data but not actually publish
     */
    dryRun?: boolean;
    /**
     * Whether or not to attempt to resume a previously saved `dryRun` and publish
     *
     * You can't use this combination at the same time as dryRun=true
     */
    dryRunResume?: boolean;
}
declare const publish: ({ dir: providedDir, interactive, makeOptions, publishTargets, dryRun, dryRunResume, outDir, }: PublishOptions) => Promise<void>;
export default publish;
//# sourceMappingURL=publish.d.ts.map