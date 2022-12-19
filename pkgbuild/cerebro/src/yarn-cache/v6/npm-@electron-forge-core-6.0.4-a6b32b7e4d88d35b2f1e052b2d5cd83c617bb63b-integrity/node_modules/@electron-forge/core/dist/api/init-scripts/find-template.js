"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTemplate = void 0;
const debug_1 = __importDefault(require("debug"));
const resolve_package_1 = __importDefault(require("resolve-package"));
const d = (0, debug_1.default)('electron-forge:init:find-template');
const findTemplate = async (dir, template) => {
    let templateModulePath;
    const resolveTemplateTypes = [
        ['global', `electron-forge-template-${template}`],
        ['global', `@electron-forge/template-${template}`],
        ['local', `electron-forge-template-${template}`],
        ['local', `@electron-forge/template-${template}`],
        ['local', template],
    ];
    let foundTemplate = false;
    for (const [templateType, moduleName] of resolveTemplateTypes) {
        try {
            d(`Trying ${templateType} template: ${moduleName}`);
            if (templateType === 'global') {
                templateModulePath = await (0, resolve_package_1.default)(moduleName);
            }
            else {
                // local
                templateModulePath = require.resolve(moduleName);
            }
            foundTemplate = true;
            break;
        }
        catch (err) {
            d(`Error: ${err instanceof Error ? err.message : err}`);
        }
    }
    if (!foundTemplate) {
        throw new Error(`Failed to locate custom template: "${template}"\n\nTry \`npm install -g @electron-forge/template-${template}\``);
    }
    d(`found template module at: ${templateModulePath}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const templateModule = require(templateModulePath);
    return templateModule.default || templateModule;
};
exports.findTemplate = findTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC10ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaW5pdC1zY3JpcHRzL2ZpbmQtdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLHNFQUE2QztBQUk3QyxNQUFNLENBQUMsR0FBRyxJQUFBLGVBQUssRUFBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQUUsUUFBZ0IsRUFBMEIsRUFBRTtJQUMxRixJQUFJLGtCQUEyQixDQUFDO0lBQ2hDLE1BQU0sb0JBQW9CLEdBQUc7UUFDM0IsQ0FBQyxRQUFRLEVBQUUsMkJBQTJCLFFBQVEsRUFBRSxDQUFDO1FBQ2pELENBQUMsUUFBUSxFQUFFLDRCQUE0QixRQUFRLEVBQUUsQ0FBQztRQUNsRCxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsUUFBUSxFQUFFLENBQUM7UUFDaEQsQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLFFBQVEsRUFBRSxDQUFDO1FBQ2pELENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztLQUNwQixDQUFDO0lBQ0YsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzFCLEtBQUssTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsSUFBSSxvQkFBb0IsRUFBRTtRQUM3RCxJQUFJO1lBQ0YsQ0FBQyxDQUFDLFVBQVUsWUFBWSxjQUFjLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDcEQsSUFBSSxZQUFZLEtBQUssUUFBUSxFQUFFO2dCQUM3QixrQkFBa0IsR0FBRyxNQUFNLElBQUEseUJBQWMsRUFBQyxVQUFVLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDTCxRQUFRO2dCQUNSLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU07U0FDUDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osQ0FBQyxDQUFDLFVBQVUsR0FBRyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN6RDtLQUNGO0lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxRQUFRLHNEQUFzRCxRQUFRLElBQUksQ0FBQyxDQUFDO0tBQ25JO0lBRUQsQ0FBQyxDQUFDLDZCQUE2QixrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFFckQsOERBQThEO0lBQzlELE1BQU0sY0FBYyxHQUFrQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUVsRixPQUFPLGNBQWMsQ0FBQyxPQUFPLElBQUksY0FBYyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQW5DVyxRQUFBLFlBQVksZ0JBbUN2QiJ9