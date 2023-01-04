"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vue_route_generator_1 = require("vue-route-generator");
const pluginName = 'VueAutoRoutingPlugin';
class VueAutoRoutingPlugin {
    constructor(options) {
        this.options = options;
        assert(options.pages, '`pages` is required');
    }
    apply(compiler) {
        const generate = () => {
            const code = vue_route_generator_1.generateRoutes(this.options);
            const to = this.options.outFile || path.resolve(__dirname, '../index.js');
            if (fs.existsSync(to) &&
                fs.readFileSync(to, 'utf8').trim() === code.trim()) {
                return;
            }
            fs.writeFileSync(to, code);
        };
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            try {
                generate();
            }
            catch (error) {
                compilation.errors.push(error);
            }
        });
    }
}
module.exports = VueAutoRoutingPlugin;
