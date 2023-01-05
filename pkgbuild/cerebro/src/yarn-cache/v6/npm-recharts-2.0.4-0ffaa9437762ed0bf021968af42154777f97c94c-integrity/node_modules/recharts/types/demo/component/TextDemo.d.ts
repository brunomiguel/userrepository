import { Component } from 'react';
declare class TextDemo extends Component {
    state: {
        exampleText: string;
        x: number;
        y: number;
        width: number;
        height: number;
        angle: number;
        scaleToFit: boolean;
        textAnchor: string;
        verticalAnchor: string;
        fontSize: string;
        fontFamily: string;
        lineHeight: string;
        showAnchor: boolean;
        resizeSvg: boolean;
    };
    render(): JSX.Element;
}
export default TextDemo;
