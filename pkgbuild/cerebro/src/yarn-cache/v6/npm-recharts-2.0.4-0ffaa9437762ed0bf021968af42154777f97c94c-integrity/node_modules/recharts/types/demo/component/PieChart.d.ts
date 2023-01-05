import React, { Component } from 'react';
export default class Demo extends Component {
    static displayName: string;
    onPieEnter: (data: any, index: number, e: React.MouseEvent) => void;
    state: {
        activeIndex: number;
        animation: boolean;
        data01: {
            name: string;
            value: number;
            v: number;
        }[];
        data02: {
            name: string;
            value: number;
        }[];
        data03: {
            name: string;
            value: number;
        }[];
    };
    handleChangeData: () => void;
    handleChangeAnimation: () => void;
    handlePieChartEnter: (a: any, b: number, c: React.MouseEvent) => void;
    handleLeave: () => void;
    render(): JSX.Element;
}
