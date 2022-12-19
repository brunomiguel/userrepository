import { ForgeListrTaskDefinition, InitTemplateOptions } from '@electron-forge/shared-types';
import { BaseTemplate } from '@electron-forge/template-base';
declare class WebpackTypeScriptTemplate extends BaseTemplate {
    templateDir: string;
    initializeTemplate(directory: string, options: InitTemplateOptions): Promise<ForgeListrTaskDefinition[]>;
}
declare const _default: WebpackTypeScriptTemplate;
export default _default;
//# sourceMappingURL=WebpackTypeScriptTemplate.d.ts.map