import { ExcalidrawElement, PointerType } from "./types";
import { Bounds } from "./bounds";
import { Zoom } from "../types";
export declare type TransformHandleDirection = "n" | "s" | "w" | "e" | "nw" | "ne" | "sw" | "se";
export declare type TransformHandleType = TransformHandleDirection | "rotation";
export declare type TransformHandle = [number, number, number, number];
export declare type TransformHandles = Partial<{
    [T in TransformHandleType]: TransformHandle;
}>;
export declare type MaybeTransformHandleType = TransformHandleType | false;
export declare const OMIT_SIDES_FOR_MULTIPLE_ELEMENTS: {
    e: boolean;
    s: boolean;
    n: boolean;
    w: boolean;
};
export declare const getTransformHandlesFromCoords: ([x1, y1, x2, y2]: Bounds, angle: number, zoom: Zoom, pointerType: PointerType, omitSides?: {
    e?: boolean | undefined;
    s?: boolean | undefined;
    n?: boolean | undefined;
    w?: boolean | undefined;
    nw?: boolean | undefined;
    ne?: boolean | undefined;
    sw?: boolean | undefined;
    se?: boolean | undefined;
    rotation?: boolean | undefined;
}) => TransformHandles;
export declare const getTransformHandles: (element: ExcalidrawElement, zoom: Zoom, pointerType?: PointerType) => TransformHandles;
