import { WebPlugin } from '@capacitor/core';
import { VoiceRecorderImpl } from './VoiceRecorderImpl';
export class VoiceRecorderWeb extends WebPlugin {
    constructor() {
        super(...arguments);
        this.voiceRecorderInstance = new VoiceRecorderImpl();
    }
    canDeviceVoiceRecord() {
        return VoiceRecorderImpl.canDeviceVoiceRecord();
    }
    hasAudioRecordingPermission() {
        return VoiceRecorderImpl.hasAudioRecordingPermission();
    }
    requestAudioRecordingPermission() {
        return VoiceRecorderImpl.requestAudioRecordingPermission();
    }
    startRecording() {
        return this.voiceRecorderInstance.startRecording();
    }
    stopRecording() {
        return this.voiceRecorderInstance.stopRecording();
    }
    pauseRecording() {
        return this.voiceRecorderInstance.pauseRecording();
    }
    resumeRecording() {
        return this.voiceRecorderInstance.resumeRecording();
    }
    getCurrentStatus() {
        return this.voiceRecorderInstance.getCurrentStatus();
    }
}
//# sourceMappingURL=web.js.map