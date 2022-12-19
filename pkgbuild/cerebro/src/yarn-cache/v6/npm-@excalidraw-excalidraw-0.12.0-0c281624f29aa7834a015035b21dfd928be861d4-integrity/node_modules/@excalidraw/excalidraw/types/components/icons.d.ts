import React from "react";
import { Theme } from "../element/types";
declare type Opts = {
    width?: number;
    height?: number;
    mirror?: true;
} & React.SVGProps<SVGSVGElement>;
export declare const createIcon: (d: string | React.ReactNode, opts?: number | Opts) => JSX.Element;
export declare const checkIcon: JSX.Element;
export declare const link: JSX.Element;
export declare const save: JSX.Element;
export declare const saveAs: JSX.Element;
export declare const load: JSX.Element;
export declare const clipboard: JSX.Element;
export declare const trash: JSX.Element;
export declare const palette: JSX.Element;
export declare const exportFile: JSX.Element;
export declare const exportImage: JSX.Element;
export declare const exportToFileIcon: JSX.Element;
export declare const zoomIn: JSX.Element;
export declare const zoomOut: JSX.Element;
export declare const done: JSX.Element;
export declare const menu: JSX.Element;
export declare const undo: JSX.Element;
export declare const redo: JSX.Element;
export declare const questionCircle: JSX.Element;
export declare const share: JSX.Element;
export declare const shareIOS: JSX.Element;
export declare const shareWindows: JSX.Element;
export declare const resetZoom: JSX.Element;
export declare const BringForwardIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const SendBackwardIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const BringToFrontIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const SendToBackIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const AlignTopIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const AlignBottomIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const AlignLeftIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const AlignRightIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const DistributeHorizontallyIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const DistributeVerticallyIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const CenterVerticallyIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const CenterHorizontallyIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const users: JSX.Element;
export declare const start: JSX.Element;
export declare const stop: JSX.Element;
export declare const close: JSX.Element;
export declare const back: JSX.Element;
export declare const clone: JSX.Element;
export declare const shield: JSX.Element;
export declare const file: JSX.Element;
export declare const GroupIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const UngroupIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FillHachureIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FillCrossHatchIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FillSolidIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const StrokeWidthIcon: React.MemoExoticComponent<({ theme, strokeWidth }: {
    theme: Theme;
    strokeWidth: number;
}) => JSX.Element>;
export declare const StrokeStyleSolidIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const StrokeStyleDashedIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const StrokeStyleDottedIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const SloppinessArchitectIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const SloppinessArtistIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const SloppinessCartoonistIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const EdgeSharpIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const EdgeRoundIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const ArrowheadNoneIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const ArrowheadArrowIcon: React.MemoExoticComponent<({ theme, flip }: {
    theme: Theme;
    flip?: boolean | undefined;
}) => JSX.Element>;
export declare const ArrowheadDotIcon: React.MemoExoticComponent<({ theme, flip }: {
    theme: Theme;
    flip?: boolean | undefined;
}) => JSX.Element>;
export declare const ArrowheadBarIcon: React.MemoExoticComponent<({ theme, flip }: {
    theme: Theme;
    flip?: boolean | undefined;
}) => JSX.Element>;
export declare const ArrowheadTriangleIcon: React.MemoExoticComponent<({ theme, flip }: {
    theme: Theme;
    flip?: boolean | undefined;
}) => JSX.Element>;
export declare const FontSizeSmallIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FontSizeMediumIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FontSizeLargeIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FontSizeExtraLargeIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FontFamilyHandDrawnIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FontFamilyNormalIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const FontFamilyCodeIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const TextAlignLeftIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const TextAlignCenterIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const TextAlignRightIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const TextAlignTopIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const TextAlignBottomIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const TextAlignMiddleIcon: React.MemoExoticComponent<({ theme }: {
    theme: Theme;
}) => JSX.Element>;
export declare const publishIcon: JSX.Element;
export declare const editIcon: JSX.Element;
export declare const eraser: JSX.Element;
export {};
