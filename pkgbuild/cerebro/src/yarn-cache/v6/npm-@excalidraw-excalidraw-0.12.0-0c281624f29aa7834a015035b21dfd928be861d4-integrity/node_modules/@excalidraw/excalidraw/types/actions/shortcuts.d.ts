import { ActionName } from "./types";
export declare type ShortcutName = SubtypeOf<ActionName, "cut" | "copy" | "paste" | "copyStyles" | "pasteStyles" | "selectAll" | "deleteSelectedElements" | "duplicateSelection" | "sendBackward" | "bringForward" | "sendToBack" | "bringToFront" | "copyAsPng" | "copyAsSvg" | "group" | "ungroup" | "gridMode" | "zenMode" | "stats" | "addToLibrary" | "viewMode" | "flipHorizontal" | "flipVertical" | "hyperlink" | "toggleLock">;
export declare const getShortcutFromShortcutName: (name: ShortcutName) => string;
