"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
exports.default = (what) => ({
    replaceWith: (replacement) => {
        console.warn(log_symbols_1.default.warning, chalk_1.default.yellow(`WARNING: ${what} is deprecated, please use ${replacement} instead`));
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwcmVjYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvZGVwcmVjYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDhEQUFxQztBQU1yQyxrQkFBZSxDQUFDLElBQVksRUFBZSxFQUFFLENBQUMsQ0FBQztJQUM3QyxXQUFXLEVBQUUsQ0FBQyxXQUFtQixFQUFRLEVBQUU7UUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLE9BQU8sRUFBRSxlQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSw4QkFBOEIsV0FBVyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3RILENBQUM7Q0FDRixDQUFDLENBQUMifQ==