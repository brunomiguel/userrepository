import { ExcalidrawElement, ExcalidrawImageElement, ExcalidrawTextElement, ExcalidrawLinearElement, ExcalidrawGenericElement, NonDeleted, TextAlign, GroupId, VerticalAlign, Arrowhead, ExcalidrawFreeDrawElement, FontFamilyValues, ExcalidrawRectangleElement } from "../element/types";
import { AppState } from "../types";
declare type ElementConstructorOpts = MarkOptional<Omit<ExcalidrawGenericElement, "id" | "type" | "isDeleted" | "updated">, "width" | "height" | "angle" | "groupIds" | "boundElements" | "seed" | "version" | "versionNonce" | "link">;
export declare const newElement: (opts: {
    type: ExcalidrawGenericElement["type"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawGenericElement>;
export declare const newTextElement: (opts: {
    text: string;
    fontSize: number;
    fontFamily: FontFamilyValues;
    textAlign: TextAlign;
    verticalAlign: VerticalAlign;
    containerId?: ExcalidrawRectangleElement["id"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawTextElement>;
export declare const updateTextElement: (element: ExcalidrawTextElement, { text, isDeleted, originalText, }: {
    text: string;
    isDeleted?: boolean | undefined;
    originalText: string;
}) => ExcalidrawTextElement;
export declare const newFreeDrawElement: (opts: {
    type: "freedraw";
    points?: ExcalidrawFreeDrawElement["points"];
    simulatePressure: boolean;
} & ElementConstructorOpts) => NonDeleted<ExcalidrawFreeDrawElement>;
export declare const newLinearElement: (opts: {
    type: ExcalidrawLinearElement["type"];
    startArrowhead: Arrowhead | null;
    endArrowhead: Arrowhead | null;
    points?: ExcalidrawLinearElement["points"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawLinearElement>;
export declare const newImageElement: (opts: {
    type: ExcalidrawImageElement["type"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawImageElement>;
export declare const deepCopyElement: (val: any, depth?: number) => any;
/**
 * Duplicate an element, often used in the alt-drag operation.
 * Note that this method has gotten a bit complicated since the
 * introduction of gruoping/ungrouping elements.
 * @param editingGroupId The current group being edited. The new
 *                       element will inherit this group and its
 *                       parents.
 * @param groupIdMapForOperation A Map that maps old group IDs to
 *                               duplicated ones. If you are duplicating
 *                               multiple elements at once, share this map
 *                               amongst all of them
 * @param element Element to duplicate
 * @param overrides Any element properties to override
 */
export declare const duplicateElement: <TElement extends Mutable<ExcalidrawElement>>(editingGroupId: AppState["editingGroupId"], groupIdMapForOperation: Map<GroupId, GroupId>, element: TElement, overrides?: Partial<TElement> | undefined) => TElement;
export {};
