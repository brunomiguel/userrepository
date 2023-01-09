/// <reference types="react" />
import "./ActiveFile.scss";
declare type ActiveFileProps = {
    fileName?: string;
    onSave: () => void;
};
export declare const ActiveFile: ({ fileName, onSave }: ActiveFileProps) => JSX.Element;
export {};
