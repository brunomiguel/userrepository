"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: convert to an import statement when this is a public API
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { allOfficialArchsForPlatformAndVersion } = require('electron-packager/src/targets');
function parseArchs(platform, declaredArch, electronVersion) {
    if (declaredArch === 'all') {
        return allOfficialArchsForPlatformAndVersion(platform, electronVersion) || ['x64'];
    }
    return declaredArch.split(',');
}
exports.default = parseArchs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtYXJjaHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9wYXJzZS1hcmNocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGlFQUFpRTtBQUNqRSw4REFBOEQ7QUFDOUQsTUFBTSxFQUFFLHFDQUFxQyxFQUFFLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFFM0YsU0FBd0IsVUFBVSxDQUFDLFFBQWdDLEVBQUUsWUFBd0MsRUFBRSxlQUF1QjtJQUNwSSxJQUFJLFlBQVksS0FBSyxLQUFLLEVBQUU7UUFDMUIsT0FBTyxxQ0FBcUMsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwRjtJQUVELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQWdCLENBQUM7QUFDaEQsQ0FBQztBQU5ELDZCQU1DIn0=