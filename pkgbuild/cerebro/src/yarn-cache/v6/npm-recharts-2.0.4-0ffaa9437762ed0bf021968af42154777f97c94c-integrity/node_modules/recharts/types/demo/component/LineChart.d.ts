import React, { Component } from 'react';
export default class Demo extends Component<any, any> {
    static displayName: string;
    state: any;
    handleChangeData: () => void;
    handleClick: (data: any, e: React.MouseEvent) => void;
    handleLineClick: (data: any, e: React.MouseEvent) => void;
    handleLegendMouseEnter: () => void;
    handleClickDot: (data: any, e: React.MouseEvent) => void;
    handleLegendMouseLeave: () => void;
    handleChangeAnotherState: () => void;
    render(): JSX.Element;
}
