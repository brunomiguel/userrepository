import React from "react";
interface SectionProps extends React.HTMLProps<HTMLElement> {
    heading: string;
    children: React.ReactNode | ((header: React.ReactNode) => React.ReactNode);
}
export declare const Section: ({ heading, children, ...props }: SectionProps) => JSX.Element;
export {};
