import { ForgeListrTaskDefinition, InitTemplateOptions } from '@electron-forge/shared-types';
import { BaseTemplate } from '@electron-forge/template-base';
declare class WebpackTemplate extends BaseTemplate {
    templateDir: string;
    initializeTemplate(directory: string, options: InitTemplateOptions): Promise<ForgeListrTaskDefinition[]>;
}
declare const _default: WebpackTemplate;
export default _default;
//# sourceMappingURL=WebpackTemplate.d.ts.map