import "./ContextMenu.scss";
import { Action } from "../actions/types";
import { ActionManager } from "../actions/manager";
import { AppState } from "../types";
import { NonDeletedExcalidrawElement } from "../element/types";
export declare type ContextMenuOption = "separator" | Action;
declare type ContextMenuProps = {
    options: ContextMenuOption[];
    onCloseRequest?(): void;
    top: number;
    left: number;
    actionManager: ActionManager;
    appState: Readonly<AppState>;
    elements: readonly NonDeletedExcalidrawElement[];
};
declare type ContextMenuParams = {
    options: (ContextMenuOption | false | null | undefined)[];
    top: ContextMenuProps["top"];
    left: ContextMenuProps["left"];
    actionManager: ContextMenuProps["actionManager"];
    appState: Readonly<AppState>;
    container: HTMLElement;
    elements: readonly NonDeletedExcalidrawElement[];
};
declare const _default: {
    push(params: ContextMenuParams): void;
};
export default _default;
