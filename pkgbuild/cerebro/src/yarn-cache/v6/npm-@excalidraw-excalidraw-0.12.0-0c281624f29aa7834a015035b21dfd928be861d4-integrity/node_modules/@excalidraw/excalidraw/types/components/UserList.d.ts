import "./UserList.scss";
import React from "react";
import { AppState } from "../types";
import { ActionManager } from "../actions/manager";
export declare const UserList: React.FC<{
    className?: string;
    mobile?: boolean;
    collaborators: AppState["collaborators"];
    actionManager: ActionManager;
}>;
