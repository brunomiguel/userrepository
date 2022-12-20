declare type PackageJSON = Record<string, unknown>;
export declare function pluginCompileExists(packageJSON: PackageJSON): boolean;
export default function locateElectronExecutable(dir: string, packageJSON: PackageJSON): Promise<string>;
export {};
//# sourceMappingURL=electron-executable.d.ts.map