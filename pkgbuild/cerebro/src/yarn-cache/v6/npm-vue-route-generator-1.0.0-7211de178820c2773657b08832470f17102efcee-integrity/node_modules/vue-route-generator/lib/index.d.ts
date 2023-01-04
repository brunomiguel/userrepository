export interface GenerateConfig {
    pages: string;
    importPrefix?: string;
    dynamicImport?: boolean;
    chunkNamePrefix?: string;
    nested?: boolean;
}
export declare function generateRoutes({ pages, importPrefix, dynamicImport, chunkNamePrefix, nested, }: GenerateConfig): string;
