import { Clipboard as ClipboardInterface, ClipboardItemConstructor } from "../ClipboardItem/spec";
import "../globals";
declare global {
    const ClipboardItem: ClipboardItemConstructor;
    interface Window {
        ClipboardItem: ClipboardItemConstructor;
    }
    interface Clipboard extends ClipboardInterface {
    }
}
