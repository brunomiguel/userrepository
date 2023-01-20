import { Component } from 'react';
export default class Demo extends Component {
    static displayName: string;
    state: {
        data: {
            name: string;
            uv: number;
            amt: number;
            pv: number;
            fill: string;
        }[];
    };
    handleChangeData: () => void;
    render(): JSX.Element;
}
