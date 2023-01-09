import { registerPlugin } from '@capacitor/core';
const VoiceRecorder = registerPlugin('VoiceRecorder', {
    web: () => import('./web').then(m => new m.VoiceRecorderWeb()),
});
export * from './definitions';
export { VoiceRecorder };
//# sourceMappingURL=index.js.map