import React, { Component } from 'react';
export default class Demo extends Component<any, any> {
    static displayName: string;
    state: {
        data: ({
            name: string;
            uv: number;
            pv: number;
            amt: number;
            bmk: number;
            time: number;
            uvError: number[];
            pvError: number[];
        } | {
            name: string;
            uv: number;
            pv: number;
            amt: number;
            bmk: number;
            time: number;
            uvError: number;
            pvError: number;
        })[];
        data01: {
            day: string;
            wether: string;
        }[];
        data02: {
            name: string;
            uv: number;
            pv: number;
        }[];
    };
    handleChangeData: () => void;
    handlePvBarClick: (data: any, index: number, e: React.MouseEvent) => void;
    handleBarAnimationStart: () => void;
    handleBarAnimationEnd: () => void;
    handleMoreData: () => void;
    handleLessData: () => void;
    render(): JSX.Element;
}
