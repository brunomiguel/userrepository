"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const BASE_OUT_DIR = 'out';
exports.default = (baseDir, forgeConfig) => {
    if (forgeConfig.buildIdentifier) {
        let identifier = forgeConfig.buildIdentifier;
        if (typeof identifier === 'function') {
            identifier = identifier();
        }
        if (identifier)
            return path_1.default.resolve(baseDir, BASE_OUT_DIR, identifier);
    }
    return path_1.default.resolve(baseDir, BASE_OUT_DIR);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LWRpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL291dC1kaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFJeEIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBRTNCLGtCQUFlLENBQUMsT0FBZSxFQUFFLFdBQWdDLEVBQVUsRUFBRTtJQUMzRSxJQUFJLFdBQVcsQ0FBQyxlQUFlLEVBQUU7UUFDL0IsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNwQyxVQUFVLEdBQUcsVUFBVSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLFVBQVU7WUFBRSxPQUFPLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN4RTtJQUNELE9BQU8sY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDIn0=