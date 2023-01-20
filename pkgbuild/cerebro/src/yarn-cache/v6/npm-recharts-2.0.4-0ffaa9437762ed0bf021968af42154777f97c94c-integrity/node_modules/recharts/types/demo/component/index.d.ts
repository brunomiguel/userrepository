import Pie from './Pie';
import CartesianAxis from './CartesianAxis';
import CartesianGrid from './CartesianGrid';
import Legend from './Legend';
import PolarGrid from './PolarGrid';
import PolarRadiusAxis from './PolarRadiusAxis';
import PolarAngleAxis from './PolarAngleAxis';
import Brush from './BrushDemo';
import Text from './TextDemo';
import Curve from './Curve';
import Rectangle from './Rectangle';
import Sector from './Sector';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import ComposedChart from './ComposedChart';
import PieChart from './PieChart';
import ScatterChart from './ScatterChart';
import RadarChart from './RadarChart';
import RadialBarChart from './RadialBarChart';
import Treemap from './Treemap';
import Sankey from './Sankey';
import ResponsiveContainer from './ResponsiveContainer';
import FunnelChart from './FunnelChart';
import Trapezoid from './Trapezoid';
import BugReproduce from './BugReproduce';
declare const _default: {
    chartWrapper: {
        LineChart: typeof LineChart;
        AreaChart: typeof AreaChart;
        BarChart: typeof BarChart;
        ComposedChart: typeof ComposedChart;
        ScatterChart: typeof ScatterChart;
        PieChart: typeof PieChart;
        RadarChart: typeof RadarChart;
        RadialBarChart: typeof RadialBarChart;
        Treemap: typeof Treemap;
        Sankey: typeof Sankey;
        FunnelChart: typeof FunnelChart;
    };
    polar: {
        Pie: typeof Pie;
        PolarRadiusAxis: typeof PolarRadiusAxis;
        PolarAngleAxis: typeof PolarAngleAxis;
        PolarGrid: typeof PolarGrid;
    };
    cartesian: {
        Brush: typeof Brush;
        CartesianAxis: typeof CartesianAxis;
        CartesianGrid: typeof CartesianGrid;
    };
    component: {
        Legend: typeof Legend;
        Text: typeof Text;
    };
    shape: {
        Curve: typeof Curve;
        Rectangle: typeof Rectangle;
        Sector: typeof Sector;
        Trapezoid: typeof Trapezoid;
    };
    other: {
        ResponsiveContainer: typeof ResponsiveContainer;
        BugReproduce: typeof BugReproduce;
    };
};
export default _default;
