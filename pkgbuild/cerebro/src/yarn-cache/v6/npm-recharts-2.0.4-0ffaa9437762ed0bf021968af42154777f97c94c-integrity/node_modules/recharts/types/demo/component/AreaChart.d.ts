import * as React from 'react';
export default class AreaChartDemo extends React.Component<any, any> {
    static displayName: string;
    state: {
        data: ({
            name: string;
            uv: number;
            pv: number;
            amt: number;
            time: number;
        } | {
            name: string;
            time: number;
            uv?: undefined;
            pv?: undefined;
            amt?: undefined;
        })[];
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
