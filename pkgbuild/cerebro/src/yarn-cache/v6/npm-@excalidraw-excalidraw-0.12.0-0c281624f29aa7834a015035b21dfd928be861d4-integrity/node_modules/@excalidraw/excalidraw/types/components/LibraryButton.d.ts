import React from "react";
import { AppState } from "../types";
export declare const LibraryButton: React.FC<{
    appState: AppState;
    setAppState: React.Component<any, AppState>["setState"];
    isMobile?: boolean;
}>;
