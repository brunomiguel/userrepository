import { Component } from 'react';
export default class Demo extends Component {
    static displayName: string;
    state: {
        data01: ({
            x: number;
            y: number;
            z: number;
            errorY: number[];
            errorX: number;
        } | {
            x: number;
            y: number;
            z: number;
            errorY: number;
            errorX: number[];
        })[];
        data02: {
            x: number;
            y: number;
            z: number;
        }[];
        data03: {
            x: number;
            y: number;
        }[];
        data04: {
            x: number;
            y: number;
        }[];
        data05: {
            x: number;
            y: number;
            z: number;
        }[];
    };
    handleChangeData: () => void;
    renderSquare: (props: any) => JSX.Element;
    render(): JSX.Element;
}
