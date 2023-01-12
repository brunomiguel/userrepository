import { ClipboardItemConstructor, ClipboardItemDataType, ClipboardItemInterface, ClipboardItemOptions, PresentationStyle } from "./spec";
export declare class ClipboardItemPolyfillImpl implements ClipboardItemInterface {
    readonly types: string[];
    readonly presentationStyle: PresentationStyle;
    private _items;
    constructor(items: {
        [type: string]: ClipboardItemDataType;
    }, options?: ClipboardItemOptions);
    getType(type: string): Promise<Blob>;
}
export declare const ClipboardItemPolyfill: ClipboardItemConstructor;
