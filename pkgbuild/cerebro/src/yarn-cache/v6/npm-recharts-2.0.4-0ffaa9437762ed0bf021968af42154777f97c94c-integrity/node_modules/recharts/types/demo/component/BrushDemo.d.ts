import { Component } from 'react';
export default class Demo extends Component<any, any> {
    static displayName: string;
    data: string[];
    state: {
        simple: {
            startIndex: number;
            endIndex: number;
        };
        gap: {
            startIndex: number;
            endIndex: number;
        };
    };
    handleChange: (res: any) => void;
    handleGapChange: (res: any) => void;
    renderTraveller: (props: any) => JSX.Element;
    render(): JSX.Element;
}
