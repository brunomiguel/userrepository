"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasYarn = exports.yarnOrNpmSpawn = exports.safeYarnOrNpm = void 0;
const cross_spawn_promise_1 = require("@malept/cross-spawn-promise");
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const yarn_or_npm_1 = __importDefault(require("yarn-or-npm"));
const safeYarnOrNpm = () => {
    const system = (0, yarn_or_npm_1.default)();
    switch (process.env.NODE_INSTALLER) {
        case 'yarn':
        case 'npm':
            return process.env.NODE_INSTALLER;
        default:
            if (process.env.NODE_INSTALLER) {
                console.warn(log_symbols_1.default.warning, chalk_1.default.yellow(`Unknown NODE_INSTALLER, using detected installer ${system}`));
            }
            return system;
    }
};
exports.safeYarnOrNpm = safeYarnOrNpm;
const yarnOrNpmSpawn = (args, opts) => (0, cross_spawn_promise_1.spawn)((0, exports.safeYarnOrNpm)(), args, opts);
exports.yarnOrNpmSpawn = yarnOrNpmSpawn;
const hasYarn = () => (0, exports.safeYarnOrNpm)() === 'yarn';
exports.hasYarn = hasYarn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFybi1vci1ucG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMveWFybi1vci1ucG0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUVBQXVGO0FBQ3ZGLGtEQUEwQjtBQUMxQiw4REFBcUM7QUFDckMsOERBQW9DO0FBRTdCLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtJQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFBLHFCQUFTLEdBQUUsQ0FBQztJQUMzQixRQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO1FBQ2xDLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLO1lBQ1IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztRQUNwQztZQUNFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxPQUFPLEVBQUUsZUFBSyxDQUFDLE1BQU0sQ0FBQyxvREFBb0QsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlHO1lBQ0QsT0FBTyxNQUFNLENBQUM7S0FDakI7QUFDSCxDQUFDLENBQUM7QUFaVyxRQUFBLGFBQWEsaUJBWXhCO0FBRUssTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFxQixFQUFFLElBQXdCLEVBQW1CLEVBQUUsQ0FBQyxJQUFBLDJCQUFLLEVBQUMsSUFBQSxxQkFBYSxHQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQTFILFFBQUEsY0FBYyxrQkFBNEc7QUFFaEksTUFBTSxPQUFPLEdBQUcsR0FBWSxFQUFFLENBQUMsSUFBQSxxQkFBYSxHQUFFLEtBQUssTUFBTSxDQUFDO0FBQXBELFFBQUEsT0FBTyxXQUE2QyJ9