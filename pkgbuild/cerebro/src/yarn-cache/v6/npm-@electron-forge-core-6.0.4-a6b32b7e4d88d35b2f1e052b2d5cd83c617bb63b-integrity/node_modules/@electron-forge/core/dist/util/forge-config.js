"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderConfigTemplate = exports.forgeConfigIsValidFilePath = exports.fromBuildIdentifier = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const interpret = __importStar(require("interpret"));
const lodash_1 = require("lodash");
const rechoir = __importStar(require("rechoir"));
const hook_1 = require("./hook");
const plugin_interface_1 = __importDefault(require("./plugin-interface"));
const read_package_json_1 = require("./read-package-json");
const underscoreCase = (str) => str
    .replace(/(.)([A-Z][a-z]+)/g, '$1_$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toUpperCase();
/* eslint-disable @typescript-eslint/no-explicit-any */
const proxify = (buildIdentifier, proxifiedObject, envPrefix) => {
    let newObject = {};
    if (Array.isArray(proxifiedObject)) {
        newObject = [];
    }
    for (const [key, val] of Object.entries(proxifiedObject)) {
        if (typeof val === 'object' && (val.constructor === Object || val.constructor === Array) && key !== 'pluginInterface' && !(val instanceof RegExp)) {
            newObject[key] = proxify(buildIdentifier, proxifiedObject[key], `${envPrefix}_${underscoreCase(key)}`);
        }
        else {
            newObject[key] = proxifiedObject[key];
        }
    }
    return new Proxy(newObject, {
        get(target, name, receiver) {
            // eslint-disable-next-line no-prototype-builtins
            if (!target.hasOwnProperty(name) && typeof name === 'string') {
                const envValue = process.env[`${envPrefix}_${underscoreCase(name)}`];
                if (envValue)
                    return envValue;
            }
            const value = Reflect.get(target, name, receiver);
            if (value && typeof value === 'object' && value.__isMagicBuildIdentifierMap) {
                const identifier = typeof buildIdentifier === 'function' ? buildIdentifier() : buildIdentifier;
                return value.map[identifier];
            }
            return value;
        },
        getOwnPropertyDescriptor(target, name) {
            const envValue = process.env[`${envPrefix}_${underscoreCase(name)}`];
            // eslint-disable-next-line no-prototype-builtins
            if (target.hasOwnProperty(name)) {
                return Reflect.getOwnPropertyDescriptor(target, name);
            }
            if (envValue) {
                return {
                    writable: true,
                    enumerable: true,
                    configurable: true,
                    value: envValue,
                };
            }
            return undefined;
        },
    });
};
function fromBuildIdentifier(map) {
    return {
        map,
        __isMagicBuildIdentifierMap: true,
    };
}
exports.fromBuildIdentifier = fromBuildIdentifier;
async function forgeConfigIsValidFilePath(dir, forgeConfig) {
    return typeof forgeConfig === 'string' && ((await fs_extra_1.default.pathExists(path_1.default.resolve(dir, forgeConfig))) || fs_extra_1.default.pathExists(path_1.default.resolve(dir, `${forgeConfig}.js`)));
}
exports.forgeConfigIsValidFilePath = forgeConfigIsValidFilePath;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderConfigTemplate(dir, templateObj, obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
            renderConfigTemplate(dir, templateObj, value);
        }
        else if (typeof value === 'string') {
            obj[key] = (0, lodash_1.template)(value)(templateObj);
            if (obj[key].startsWith('require:')) {
                obj[key] = require(path_1.default.resolve(dir, obj[key].substr(8)));
            }
        }
    }
}
exports.renderConfigTemplate = renderConfigTemplate;
exports.default = async (dir) => {
    const packageJSON = await (0, read_package_json_1.readRawPackageJson)(dir);
    let forgeConfig = packageJSON.config && packageJSON.config.forge ? packageJSON.config.forge : null;
    if (!forgeConfig || typeof forgeConfig === 'string') {
        for (const extension of ['.js', ...Object.keys(interpret.extensions)]) {
            const pathToConfig = path_1.default.resolve(dir, `forge.config${extension}`);
            if (await fs_extra_1.default.pathExists(pathToConfig)) {
                rechoir.prepare(interpret.extensions, pathToConfig, dir);
                forgeConfig = `forge.config${extension}`;
                break;
            }
        }
    }
    forgeConfig = forgeConfig || {};
    if (await forgeConfigIsValidFilePath(dir, forgeConfig)) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const loaded = require(path_1.default.resolve(dir, forgeConfig));
            forgeConfig = 'default' in loaded ? loaded.default : loaded;
        }
        catch (err) {
            console.error(`Failed to load: ${path_1.default.resolve(dir, forgeConfig)}`);
            throw err;
        }
    }
    else if (typeof forgeConfig !== 'object') {
        throw new Error('Expected packageJSON.config.forge to be an object or point to a requirable JS file');
    }
    const defaultForgeConfig = {
        rebuildConfig: {},
        packagerConfig: {},
        makers: [],
        publishers: [],
        plugins: [],
    };
    let resolvedForgeConfig = {
        ...defaultForgeConfig,
        ...forgeConfig,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pluginInterface: null,
    };
    const templateObj = { ...packageJSON, year: new Date().getFullYear() };
    renderConfigTemplate(dir, templateObj, resolvedForgeConfig);
    resolvedForgeConfig.pluginInterface = new plugin_interface_1.default(dir, resolvedForgeConfig);
    resolvedForgeConfig = await (0, hook_1.runMutatingHook)(resolvedForgeConfig, 'resolveForgeConfig', resolvedForgeConfig);
    return proxify(resolvedForgeConfig.buildIdentifier || '', resolvedForgeConfig, 'ELECTRON_FORGE');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ2UtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvZm9yZ2UtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBR3hCLHdEQUEwQjtBQUMxQixxREFBdUM7QUFDdkMsbUNBQWtDO0FBQ2xDLGlEQUFtQztBQUVuQyxpQ0FBeUM7QUFDekMsMEVBQWlEO0FBQ2pELDJEQUF5RDtBQUV6RCxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQ3JDLEdBQUc7S0FDQSxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDO0tBQ3JDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUM7S0FDdEMsV0FBVyxFQUFFLENBQUM7QUFNbkIsdURBQXVEO0FBQ3ZELE1BQU0sT0FBTyxHQUFHLENBQTBCLGVBQXdDLEVBQUUsZUFBa0IsRUFBRSxTQUFpQixFQUFLLEVBQUU7SUFDOUgsSUFBSSxTQUFTLEdBQU0sRUFBUyxDQUFDO0lBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNsQyxTQUFTLEdBQUcsRUFBUyxDQUFDO0tBQ3ZCO0lBRUQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDeEQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxLQUFLLE1BQU0sSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLE1BQU0sQ0FBQyxFQUFFO1lBQ2hKLFNBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLGVBQWUsRUFBRyxlQUF1QixDQUFDLEdBQUcs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