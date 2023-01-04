import { Compiler } from 'webpack';
import { GenerateConfig } from 'vue-route-generator';
interface Options extends GenerateConfig {
    outFile?: string;
}
declare namespace VueAutoRoutingPlugin {
    type AutoRoutingOptions = Options;
}
declare class VueAutoRoutingPlugin {
    private options;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
export = VueAutoRoutingPlugin;
