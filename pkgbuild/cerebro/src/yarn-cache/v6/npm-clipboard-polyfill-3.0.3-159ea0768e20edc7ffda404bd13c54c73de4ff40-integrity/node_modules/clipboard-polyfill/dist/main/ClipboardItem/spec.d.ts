export declare type ClipboardItems = ClipboardItemInterface[];
export interface Clipboard extends EventTarget {
    read(): Promise<ClipboardItems>;
    readText(): Promise<string>;
    write(data: ClipboardItems): Promise<void>;
    writeText(data: string): Promise<void>;
}
export declare type ClipboardItemDataType = string | Blob;
export declare type ClipboardItemData = Promise<ClipboardItemDataType>;
export declare type ClipboardItemDelayedCallback = () => ClipboardItemDelayedCallback;
export interface ClipboardItemConstructor {
    new (items: {
        [type: string]: ClipboardItemDataType;
    }, options?: ClipboardItemOptions): ClipboardItemInterface;
    createDelayed?(// [optional here, non-optional in spec]
    items: {
        [type: string]: () => ClipboardItemDelayedCallback;
    }, options?: ClipboardItemOptions): ClipboardItemInterface;
}
export interface ClipboardItemInterface {
    readonly presentationStyle?: PresentationStyle;
    readonly lastModified?: number;
    readonly delayed?: boolean;
    readonly types: string[];
    getType(type: string): Promise<Blob>;
}
export declare type PresentationStyle = "unspecified" | "inline" | "attachment";
export interface ClipboardItemOptions {
    presentationStyle?: PresentationStyle;
}
