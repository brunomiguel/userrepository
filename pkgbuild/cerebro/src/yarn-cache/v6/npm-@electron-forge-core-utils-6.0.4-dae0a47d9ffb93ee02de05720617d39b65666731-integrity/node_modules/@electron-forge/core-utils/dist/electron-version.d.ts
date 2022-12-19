declare type PackageJSONWithDeps = {
    devDependencies?: Record<string, string>;
    dependencies?: Record<string, string>;
};
export declare class PackageNotFoundError extends Error {
    constructor(packageName: string, dir: string);
}
export declare function getElectronModulePath(dir: string, packageJSON: PackageJSONWithDeps): Promise<string | undefined>;
export declare function getElectronVersion(dir: string, packageJSON: PackageJSONWithDeps): Promise<string>;
export declare function updateElectronDependency(packageJSON: PackageJSONWithDeps, dev: string[], exact: string[]): [string[], string[]];
export {};
//# sourceMappingURL=electron-version.d.ts.map