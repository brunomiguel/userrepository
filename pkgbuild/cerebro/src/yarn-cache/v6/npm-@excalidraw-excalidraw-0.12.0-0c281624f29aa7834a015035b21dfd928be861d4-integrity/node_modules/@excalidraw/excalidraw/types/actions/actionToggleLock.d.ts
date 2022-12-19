/// <reference types="react" />
import { ExcalidrawElement } from "../element/types";
export declare const actionToggleLock: {
    name: "toggleLock";
    trackEvent: {
        category: "element";
    };
    perform: (elements: readonly ExcalidrawElement[], appState: Readonly<import("../types").AppState>) => false | {
        elements: ExcalidrawElement[];
        appState: Readonly<import("../types").AppState>;
        commitToHistory: true;
    };
    contextItemLabel: (elements: readonly ExcalidrawElement[], appState: Readonly<import("../types").AppState>) => "labels.elementLock.unlock" | "labels.elementLock.lock" | "labels.elementLock.lockAll" | "labels.elementLock.unlockAll";
    keyTest: (event: KeyboardEvent | import("react").KeyboardEvent<Element>, appState: import("../types").AppState, elements: readonly ExcalidrawElement[]) => boolean;
} & {
    keyTest?: ((event: KeyboardEvent | import("react").KeyboardEvent<Element>, appState: import("../types").AppState, elements: readonly ExcalidrawElement[]) => boolean) | undefined;
};
