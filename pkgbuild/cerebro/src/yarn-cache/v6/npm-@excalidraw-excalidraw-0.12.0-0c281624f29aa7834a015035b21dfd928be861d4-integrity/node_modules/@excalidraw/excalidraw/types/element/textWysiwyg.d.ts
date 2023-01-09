import { ExcalidrawElement, ExcalidrawTextElement } from "./types";
import App from "../components/App";
export declare const textWysiwyg: ({ id, onChange, onSubmit, getViewportCoords, element, canvas, excalidrawContainer, app, }: {
    id: ExcalidrawElement["id"];
    onChange?: ((text: string) => void) | undefined;
    onSubmit: (data: {
        text: string;
        viaKeyboard: boolean;
        originalText: string;
    }) => void;
    getViewportCoords: (x: number, y: number) => [number, number];
    element: ExcalidrawTextElement;
    canvas: HTMLCanvasElement | null;
    excalidrawContainer: HTMLDivElement | null;
    app: App;
}) => void;
