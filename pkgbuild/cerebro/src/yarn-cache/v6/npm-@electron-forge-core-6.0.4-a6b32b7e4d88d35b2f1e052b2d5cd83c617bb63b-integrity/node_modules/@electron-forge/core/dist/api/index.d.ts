import { ElectronProcess, ForgeMakeResult } from '@electron-forge/shared-types';
import ForgeUtils from '../util';
import { ImportOptions } from './import';
import { InitOptions } from './init';
import { MakeOptions } from './make';
import { PackageOptions } from './package';
import { PublishOptions } from './publish';
import { StartOptions } from './start';
export declare class ForgeAPI {
    /**
     * Attempt to import a given module directory to the Electron Forge standard.
     *
     * * Sets up `git` and the correct NPM dependencies
     * * Adds a template forge config to `package.json`
     */
    import(opts: ImportOptions): Promise<void>;
    /**
     * Initialize a new Electron Forge template project in the given directory.
     */
    init(opts: InitOptions): Promise<void>;
    /**
     * Make distributables for an Electron application
     */
    make(opts: MakeOptions): Promise<ForgeMakeResult[]>;
    /**
     * Resolves hooks if they are a path to a file (instead of a `Function`)
     */
    package(opts: PackageOptions): Promise<void>;
    /**
     * Publish an Electron application into the given target service
     */
    publish(opts: PublishOptions): Promise<void>;
    /**
     * Start an Electron application.
     *
     * Handles things like native module rebuilding for you on the fly
     */
    start(opts: StartOptions): Promise<ElectronProcess>;
}
declare const api: ForgeAPI;
declare const utils: ForgeUtils;
export { ForgeMakeResult, ElectronProcess, ForgeUtils, ImportOptions, InitOptions, MakeOptions, PackageOptions, PublishOptions, StartOptions, api, utils };
//# sourceMappingURL=index.d.ts.map