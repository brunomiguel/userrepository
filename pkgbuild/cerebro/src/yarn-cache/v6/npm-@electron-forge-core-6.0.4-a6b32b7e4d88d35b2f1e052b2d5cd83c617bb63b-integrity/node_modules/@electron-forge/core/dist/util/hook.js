"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMutatingHook = exports.getHookListrTasks = exports.runHook = void 0;
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const d = (0, debug_1.default)('electron-forge:hook');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runHook = async (forgeConfig, hookName, ...hookArgs) => {
    const { hooks } = forgeConfig;
    if (hooks) {
        d(`hook triggered: ${hookName}`);
        if (typeof hooks[hookName] === 'function') {
            d('calling hook:', hookName, 'with args:', hookArgs);
            await hooks[hookName](forgeConfig, ...hookArgs);
        }
    }
    await forgeConfig.pluginInterface.triggerHook(hookName, hookArgs);
};
exports.runHook = runHook;
const getHookListrTasks = async (forgeConfig, hookName, ...hookArgs) => {
    const { hooks } = forgeConfig;
    const tasks = [];
    if (hooks) {
        d(`hook triggered: ${hookName}`);
        if (typeof hooks[hookName] === 'function') {
            d('calling hook:', hookName, 'with args:', hookArgs);
            tasks.push({
                title: `Running ${chalk_1.default.yellow(hookName)} hook from forgeConfig`,
                task: async () => {
                    await hooks[hookName](forgeConfig, ...hookArgs);
                },
            });
        }
    }
    tasks.push(...(await forgeConfig.pluginInterface.getHookListrTasks(hookName, hookArgs)));
    return tasks;
};
exports.getHookListrTasks = getHookListrTasks;
async function runMutatingHook(forgeConfig, hookName, ...item) {
    const { hooks } = forgeConfig;
    if (hooks) {
        d(`hook triggered: ${hookName}`);
        if (typeof hooks[hookName] === 'function') {
            d('calling mutating hook:', hookName, 'with item:', item[0]);
            const hook = hooks[hookName];
            const result = await hook(forgeConfig, ...item);
            if (typeof result !== 'undefined') {
                item[0] = result;
            }
        }
    }
    return forgeConfig.pluginInterface.triggerMutatingHook(hookName, item[0]);
}
exports.runMutatingHook = runMutatingHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2hvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsa0RBQTBCO0FBQzFCLGtEQUEwQjtBQUUxQixNQUFNLENBQUMsR0FBRyxJQUFBLGVBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRXZDLDhEQUE4RDtBQUN2RCxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQzFCLFdBQWdDLEVBQ2hDLFFBQWMsRUFDZCxHQUFHLFFBQXlDLEVBQzdCLEVBQUU7SUFDakIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUM5QixJQUFJLEtBQUssRUFBRTtRQUNULENBQUMsQ0FBQyxtQkFBbUIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN6QyxDQUFDLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckQsTUFBTyxLQUFLLENBQUMsUUFBUSxDQUE2QixDQUFDLFdBQVcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzlFO0tBQ0Y7SUFDRCxNQUFNLFdBQVcsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUM7QUFkVyxRQUFBLE9BQU8sV0FjbEI7QUFFSyxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsV0FBZ0MsRUFDaEMsUUFBYyxFQUNkLEdBQUcsUUFBeUMsRUFDUCxFQUFFO0lBQ3ZDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDOUIsTUFBTSxLQUFLLEdBQStCLEVBQUUsQ0FBQztJQUM3QyxJQUFJLEtBQUssRUFBRTtRQUNULENBQUMsQ0FBQyxtQkFBbUIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN6QyxDQUFDLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxLQUFLLEVBQUUsV0FBVyxlQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0I7Z0JBQ2hFLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDZixNQUFPLEtBQUssQ0FBQyxRQUFRLENBQTZCLENBQUMsV0FBVyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBQy9FLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxXQUFXLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFyQlcsUUFBQSxpQkFBaUIscUJBcUI1QjtBQUVLLEtBQUssVUFBVSxlQUFlLENBQ25DLFdBQWdDLEVBQ2hDLFFBQWMsRUFDZCxHQUFHLElBQXVDO0lBRTFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDOUIsSUFBSSxLQUFLLEVBQUU7UUFDVCxDQUFDLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDekMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBOEIsQ0FBQztZQUMxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNoRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUNsQjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLFdBQVcsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFsQkQsMENBa0JDIn0=