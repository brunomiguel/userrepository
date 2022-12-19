import "./Modal.scss";
import React from "react";
import { AppState } from "../types";
export declare const Modal: (props: {
    className?: string;
    children: React.ReactNode;
    maxWidth?: number;
    onCloseRequest(): void;
    labelledBy: string;
    theme?: AppState["theme"];
    closeOnClickOutside?: boolean;
}) => React.ReactPortal | null;
