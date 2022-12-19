import { ForgeListrTaskDefinition, ForgeMutatingHookSignatures, ForgeSimpleHookSignatures, IForgePluginInterface, ResolvedForgeConfig, StartResult } from '@electron-forge/shared-types';
import { StartOptions } from '../api';
export default class PluginInterface implements IForgePluginInterface {
    private plugins;
    private config;
    constructor(dir: string, forgeConfig: ResolvedForgeConfig);
    triggerHook<Hook extends keyof ForgeSimpleHookSignatures>(hookName: Hook, hookArgs: ForgeSimpleHookSignatures[Hook]): Promise<void>;
    getHookListrTasks<Hook extends keyof ForgeSimpleHookSignatures>(hookName: Hook, hookArgs: ForgeSimpleHookSignatures[Hook]): Promise<ForgeListrTaskDefinition[]>;
    triggerMutatingHook<Hook extends keyof ForgeMutatingHookSignatures>(hookName: Hook, ...item: ForgeMutatingHookSignatures[Hook]): Promise<ForgeMutatingHookSignatures[Hook][0]>;
    overrideStartLogic(opts: StartOptions): Promise<StartResult>;
}
//# sourceMappingURL=plugin-interface.d.ts.map