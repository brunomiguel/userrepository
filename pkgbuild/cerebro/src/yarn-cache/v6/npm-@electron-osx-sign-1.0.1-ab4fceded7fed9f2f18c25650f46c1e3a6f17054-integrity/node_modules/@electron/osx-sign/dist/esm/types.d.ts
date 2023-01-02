export declare type ElectronMacPlatform = 'darwin' | 'mas';
declare type SigningDistributionType = 'development' | 'distribution';
export declare type BaseSignOptions = Readonly<{
    app: string;
    identity?: string;
    platform?: ElectronMacPlatform;
    keychain?: string;
}>;
declare type OnlyValidatedBaseSignOptions = {
    platform: ElectronMacPlatform;
};
/**
 * Any missing options will use the default values, providing a partial
 * structure will shallow merge with the default values.
 */
export declare type PerFileSignOptions = {
    /**
     * The entitlements file to use when signing this file
     */
    entitlements?: string | string[];
    /**
     * Whether to enable hardened runtime for this file.  Enabled by default.
     */
    hardenedRuntime?: boolean;
    /**
     * The designated requirements to embed when signing this file
     */
    requirements?: string;
    /**
     * See --options of the "codesign" command.
     *
     * https://www.manpagez.com/man/1/codesign
     */
    signatureFlags?: string | string[];
    /**
     * The timestamp server to use when signing, by default uses the Apple provided
     * timestamp server.
     */
    timestamp?: string;
};
declare type OnlySignOptions = {
    binaries?: string[];
    optionsForFile?: (filePath: string) => PerFileSignOptions;
    identityValidation?: boolean;
    ignore?: string | string[] | ((file: string) => boolean);
    preAutoEntitlements?: boolean;
    preEmbedProvisioningProfile?: boolean;
    provisioningProfile?: string;
    strictVerify?: boolean;
    type?: SigningDistributionType;
    version?: string;
};
declare type OnlyValidatedSignOptions = {
    ignore?: (string | ((file: string) => boolean))[];
    type: SigningDistributionType;
};
declare type OnlyFlatOptions = {
    identityValidation?: boolean;
    install?: string;
    pkg?: string;
    scripts?: string;
};
declare type OnlyValidatedFlatOptions = {
    install: string;
    pkg: string;
};
declare type ValidatedForm<UnValidated, Validated> = Omit<UnValidated, keyof Validated> & Validated;
export declare type ValidatedBaseSignOptions = Readonly<ValidatedForm<BaseSignOptions, OnlyValidatedBaseSignOptions>>;
export declare type SignOptions = Readonly<OnlySignOptions & BaseSignOptions>;
export declare type ValidatedSignOptions = Readonly<ValidatedForm<OnlySignOptions, OnlyValidatedSignOptions> & ValidatedBaseSignOptions>;
export declare type FlatOptions = Readonly<OnlyFlatOptions & BaseSignOptions>;
export declare type ValidatedFlatOptions = Readonly<ValidatedForm<OnlyFlatOptions, OnlyValidatedFlatOptions> & ValidatedBaseSignOptions>;
export {};
