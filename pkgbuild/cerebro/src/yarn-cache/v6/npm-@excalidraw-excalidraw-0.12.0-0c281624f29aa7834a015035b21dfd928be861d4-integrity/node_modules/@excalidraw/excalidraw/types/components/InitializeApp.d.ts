import React from "react";
import { Language } from "../i18n";
interface Props {
    langCode: Language["code"];
    children: React.ReactElement;
}
export declare const InitializeApp: (props: Props) => JSX.Element;
export {};
