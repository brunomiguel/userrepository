"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sudo = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const sudo_prompt_1 = __importDefault(require("sudo-prompt"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const which = async (type, prog, promise) => {
    if ((0, child_process_1.spawnSync)('which', [prog]).status === 0) {
        await promise();
    }
    else {
        throw new Error(`${prog} is required to install ${type} packages`);
    }
};
const sudo = (type, prog, args) => which(type, prog, () => (0, util_1.promisify)(sudo_prompt_1.default.exec)(`${prog} ${args}`, { name: 'Electron Forge' }));
exports.sudo = sudo;
exports.default = which;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGludXgtaW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvbGludXgtaW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlEQUEwQztBQUMxQywrQkFBaUM7QUFFakMsOERBQXFDO0FBRXJDLDhEQUE4RDtBQUM5RCxNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxPQUEyQixFQUFpQixFQUFFO0lBQzdGLElBQUksSUFBQSx5QkFBUyxFQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMzQyxNQUFNLE9BQU8sRUFBRSxDQUFDO0tBQ2pCO1NBQU07UUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSwyQkFBMkIsSUFBSSxXQUFXLENBQUMsQ0FBQztLQUNwRTtBQUNILENBQUMsQ0FBQztBQUVLLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQWlCLEVBQUUsQ0FDOUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBQSxnQkFBUyxFQUFDLHFCQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFEeEYsUUFBQSxJQUFJLFFBQ29GO0FBRXJHLGtCQUFlLEtBQUssQ0FBQyJ9