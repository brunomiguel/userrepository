import { Component } from 'react';
export default class Demo extends Component {
    static displayName: string;
    state: {
        data: {
            name: string;
            uv: number;
            pv: number;
            amt: number;
            time: number;
        }[];
        data01: {
            day: string;
            weather: string;
        }[];
        data02: {
            name: string;
            uv: number;
            pv: number;
            amt: number;
        }[];
    };
    handleChangeData: () => void;
    render(): JSX.Element;
}
