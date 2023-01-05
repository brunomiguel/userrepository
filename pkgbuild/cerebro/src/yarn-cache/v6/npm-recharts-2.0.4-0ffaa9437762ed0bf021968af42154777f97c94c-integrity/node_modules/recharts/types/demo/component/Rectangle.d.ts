import { Component } from 'react';
declare class RectangleDemo extends Component<any, any> {
    state: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    changeSize: () => void;
    render(): JSX.Element;
}
export default RectangleDemo;
