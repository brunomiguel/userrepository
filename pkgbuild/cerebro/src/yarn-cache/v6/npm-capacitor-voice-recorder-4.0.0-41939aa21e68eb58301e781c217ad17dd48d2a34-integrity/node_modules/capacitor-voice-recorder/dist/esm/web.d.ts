import { WebPlugin } from '@capacitor/core';
import type { CurrentRecordingStatus, GenericResponse, RecordingData, VoiceRecorderPlugin } from './definitions';
export declare class VoiceRecorderWeb extends WebPlugin implements VoiceRecorderPlugin {
    private voiceRecorderInstance;
    canDeviceVoiceRecord(): Promise<GenericResponse>;
    hasAudioRecordingPermission(): Promise<GenericResponse>;
    requestAudioRecordingPermission(): Promise<GenericResponse>;
    startRecording(): Promise<GenericResponse>;
    stopRecording(): Promise<RecordingData>;
    pauseRecording(): Promise<GenericResponse>;
    resumeRecording(): Promise<GenericResponse>;
    getCurrentStatus(): Promise<CurrentRecordingStatus>;
}
