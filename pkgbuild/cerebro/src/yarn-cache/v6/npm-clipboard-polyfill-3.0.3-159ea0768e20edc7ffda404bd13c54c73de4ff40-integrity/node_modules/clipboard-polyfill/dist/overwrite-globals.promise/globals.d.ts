import { ClipboardItemConstructor, ClipboardItems } from "./ClipboardItem/spec";
export declare const originalNavigatorClipboardRead: (() => Promise<ClipboardItems>) | undefined;
export declare const originalNavigatorClipboardReadText: (() => Promise<string>) | undefined;
export declare const originalNavigatorClipboardWrite: ((data: ClipboardItems) => Promise<void>) | undefined;
export declare const originalNavigatorClipboardWriteText: ((data: string) => Promise<void>) | undefined;
export declare const originalWindow: (Window & typeof globalThis) | undefined;
export declare const originalWindowClipboardItem: ClipboardItemConstructor | undefined;
