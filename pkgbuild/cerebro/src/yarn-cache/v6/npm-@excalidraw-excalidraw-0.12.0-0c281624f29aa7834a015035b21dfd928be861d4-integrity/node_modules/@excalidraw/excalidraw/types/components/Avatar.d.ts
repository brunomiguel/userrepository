import "./Avatar.scss";
import React from "react";
declare type AvatarProps = {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    color: string;
    border: string;
    name: string;
    src?: string;
};
export declare const Avatar: ({ color, border, onClick, name, src }: AvatarProps) => JSX.Element;
export {};
