import { Point, Zoom } from "./types";
import { ExcalidrawLinearElement } from "./element/types";
export declare const rotate: (x1: number, y1: number, x2: number, y2: number, angle: number) => [number, number];
export declare const rotatePoint: (point: readonly [number, number], center: readonly [number, number], angle: number) => [number, number];
export declare const adjustXYWithRotation: (sides: {
    n?: boolean;
    e?: boolean;
    s?: boolean;
    w?: boolean;
}, x: number, y: number, angle: number, deltaX1: number, deltaY1: number, deltaX2: number, deltaY2: number) => [number, number];
export declare const getPointOnAPath: (point: readonly [number, number], path: Point[]) => {
    x: number;
    y: number;
    segment: number;
} | null;
export declare const distance2d: (x1: number, y1: number, x2: number, y2: number) => number;
export declare const centerPoint: (a: readonly [number, number], b: readonly [number, number]) => readonly [number, number];
export declare const isPathALoop: (points: ExcalidrawLinearElement["points"], zoomValue?: Zoom["value"]) => boolean;
export declare const isPointInPolygon: (points: Point[], x: number, y: number) => boolean;
export declare const getGridPoint: (x: number, y: number, gridSize: number | null) => [number, number];
