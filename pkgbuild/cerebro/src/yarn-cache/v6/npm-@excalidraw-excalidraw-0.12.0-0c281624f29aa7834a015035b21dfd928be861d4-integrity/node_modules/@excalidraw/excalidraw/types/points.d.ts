import { Point } from "./types";
export declare const getSizeFromPoints: (points: readonly Point[]) => {
    width: number;
    height: number;
};
export declare const rescalePoints: (dimension: 0 | 1, nextDimensionSize: number, prevPoints: readonly Point[]) => Point[];
