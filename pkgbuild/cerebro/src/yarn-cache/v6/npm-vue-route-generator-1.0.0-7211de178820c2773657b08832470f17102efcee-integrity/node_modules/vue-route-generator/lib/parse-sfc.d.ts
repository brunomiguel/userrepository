export interface ParseResult {
    customBlocks: CustomBlock[];
}
export interface CustomBlock {
    type: string;
    content: string;
}
export declare function parseSFC(code: string): ParseResult;
