import { Component } from 'react';
export default class Demo extends Component {
    static displayName: string;
    state: {
        data: {
            value: number;
            name: string;
        }[];
    };
    handleChangeData: () => void;
    render(): JSX.Element;
}
