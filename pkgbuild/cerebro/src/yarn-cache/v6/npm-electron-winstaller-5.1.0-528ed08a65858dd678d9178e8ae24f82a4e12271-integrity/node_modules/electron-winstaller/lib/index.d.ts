import { SquirrelWindowsOptions } from './options';
export { SquirrelWindowsOptions } from './options';
export { SquirrelWindowsOptions as Options } from './options';
export declare function convertVersion(version: string): string;
export declare function createWindowsInstaller(options: SquirrelWindowsOptions): Promise<void>;
