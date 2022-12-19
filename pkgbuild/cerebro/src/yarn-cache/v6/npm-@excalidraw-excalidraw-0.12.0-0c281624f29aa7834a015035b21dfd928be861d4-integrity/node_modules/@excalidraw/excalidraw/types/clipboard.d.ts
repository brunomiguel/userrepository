import { ExcalidrawElement, NonDeletedExcalidrawElement } from "./element/types";
import { AppState, BinaryFiles } from "./types";
import { Spreadsheet } from "./charts";
export interface ClipboardData {
    spreadsheet?: Spreadsheet;
    elements?: readonly ExcalidrawElement[];
    files?: BinaryFiles;
    text?: string;
    errorMessage?: string;
}
export declare const probablySupportsClipboardReadText: boolean;
export declare const probablySupportsClipboardWriteText: boolean;
export declare const probablySupportsClipboardBlob: boolean;
export declare const copyToClipboard: (elements: readonly NonDeletedExcalidrawElement[], appState: AppState, files: BinaryFiles | null) => Promise<void>;
/**
 * Attempts to parse clipboard. Prefers system clipboard.
 */
export declare const parseClipboard: (event: ClipboardEvent | null) => Promise<ClipboardData>;
export declare const copyBlobToClipboardAsPng: (blob: Blob | Promise<Blob>) => Promise<void>;
export declare const copyTextToSystemClipboard: (text: string | null) => Promise<void>;
