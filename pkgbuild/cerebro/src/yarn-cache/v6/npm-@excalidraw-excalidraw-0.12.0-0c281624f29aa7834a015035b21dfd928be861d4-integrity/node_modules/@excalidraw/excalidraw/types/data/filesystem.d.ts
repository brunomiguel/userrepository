import { FileSystemHandle, supported as nativeFileSystemSupported } from "browser-fs-access";
declare type FILE_EXTENSION = "gif" | "jpg" | "png" | "excalidraw.png" | "svg" | "excalidraw.svg" | "json" | "excalidraw" | "excalidrawlib";
export declare const fileOpen: <M extends boolean | undefined = false>(opts: {
    extensions?: FILE_EXTENSION[] | undefined;
    description: string;
    multiple?: M | undefined;
}) => Promise<M extends false | undefined ? File : File[]>;
export declare const fileSave: (blob: Blob, opts: {
    /** supply without the extension */
    name: string;
    /** file extension */
    extension: FILE_EXTENSION;
    description: string;
    /** existing FileSystemHandle */
    fileHandle?: FileSystemHandle | null;
}) => Promise<FileSystemHandle | null>;
export type { FileSystemHandle };
export { nativeFileSystemSupported };
