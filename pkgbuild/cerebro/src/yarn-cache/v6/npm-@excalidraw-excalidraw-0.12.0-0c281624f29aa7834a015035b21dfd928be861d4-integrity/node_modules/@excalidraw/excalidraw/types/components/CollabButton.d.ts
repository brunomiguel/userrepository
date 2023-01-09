/// <reference types="react" />
import "./CollabButton.scss";
declare const CollabButton: ({ isCollaborating, collaboratorCount, onClick, }: {
    isCollaborating: boolean;
    collaboratorCount: number;
    onClick: () => void;
}) => JSX.Element;
export default CollabButton;
