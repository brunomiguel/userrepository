import { Component } from 'react';
declare class DemoTreemap extends Component {
    static displayName: string;
    state: {
        data: {
            name: string;
            children: ({
                name: string;
                children: ({
                    name: string;
                    size: number;
                    children?: undefined;
                } | {
                    name: string;
                    children: {
                        name: string;
                        size: number;
                    }[];
                    size?: undefined;
                })[];
                size?: undefined;
            } | {
                name: string;
                size: number;
                children?: undefined;
            })[];
        }[];
    };
    render(): JSX.Element;
}
export default DemoTreemap;
