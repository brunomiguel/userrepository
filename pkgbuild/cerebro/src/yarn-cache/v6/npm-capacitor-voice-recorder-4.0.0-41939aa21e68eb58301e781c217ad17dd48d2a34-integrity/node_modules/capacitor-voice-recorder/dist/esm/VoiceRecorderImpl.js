import getBlobDuration from 'get-blob-duration';
import { alreadyRecordingError, couldNotQueryPermissionStatusError, deviceCannotVoiceRecordError, failedToFetchRecordingError, failedToRecordError, failureResponse, missingPermissionError, recordingHasNotStartedError, successResponse, } from './predefined-web-responses';
// these mime types will be checked one by one in order until one of them is found to be supported by the current browser
const possibleMimeTypes = ['audio/aac', 'audio/webm;codecs=opus', 'audio/mp4', 'audio/webm', 'audio/ogg;codecs=opus'];
const neverResolvingPromise = () => new Promise(() => undefined);
export class VoiceRecorderImpl {
    constructor() {
        this.mediaRecorder = null;
        this.chunks = [];
        this.pendingResult = neverResolvingPromise();
    }
    static async canDeviceVoiceRecord() {
        var _a;
        if (((_a = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia) == null || VoiceRecorderImpl.getSupportedMimeType() == null) {
            return failureResponse();
        }
        else {
            return successResponse();
        }
    }
    async startRecording() {
        if (this.mediaRecorder != null) {
            throw alreadyRecordingError();
        }
        const deviceCanRecord = await VoiceRecorderImpl.canDeviceVoiceRecord();
        if (!deviceCanRecord.value) {
            throw deviceCannotVoiceRecordError();
        }
        const havingPermission = await VoiceRecorderImpl.hasAudioRecordingPermission().catch(() => successResponse());
        if (!havingPermission.value) {
            throw missingPermissionError();
        }
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(this.onSuccessfullyStartedRecording.bind(this))
            .catch(this.onFailedToStartRecording.bind(this));
        return successResponse();
    }
    async stopRecording() {
        if (this.mediaRecorder == null) {
            throw recordingHasNotStartedError();
        }
        try {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            return this.pendingResult;
        }
        catch (ignore) {
            throw failedToFetchRecordingError();
        }
        finally {
            this.prepareInstanceForNextOperation();
        }
    }
    static async hasAudioRecordingPermission() {
        return navigator.permissions.query({ name: 'microphone' })
            .then(result => ({ value: result.state === 'granted' }))
            .catch(() => { throw couldNotQueryPermissionStatusError(); });
    }
    static async requestAudioRecordingPermission() {
        const havingPermission = await VoiceRecorderImpl.hasAudioRecordingPermission().catch(() => failureResponse());
        if (havingPermission.value) {
            return successResponse();
        }
        return navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => successResponse())
            .catch(() => failureResponse());
    }
    pauseRecording() {
        if (this.mediaRecorder == null) {
            throw recordingHasNotStartedError();
        }
        else if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.pause();
            return Promise.resolve(successResponse());
        }
        else {
            return Promise.resolve(failureResponse());
        }
    }
    resumeRecording() {
        if (this.mediaRecorder == null) {
            throw recordingHasNotStartedError();
        }
        else if (this.mediaRecorder.state === 'paused') {
            this.mediaRecorder.resume();
            return Promise.resolve(successResponse());
        }
        else {
            return Promise.resolve(failureResponse());
        }
    }
    getCurrentStatus() {
        if (this.mediaRecorder == null) {
            return Promise.resolve({ status: 'NONE' });
        }
        else if (this.mediaRecorder.state === 'recording') {
            return Promise.resolve({ status: 'RECORDING' });
        }
        else if (this.mediaRecorder.state === 'paused') {
            return Promise.resolve({ status: 'PAUSED' });
        }
        else {
            return Promise.resolve({ status: 'NONE' });
        }
    }
    static getSupportedMimeType() {
        if ((MediaRecorder === null || MediaRecorder === void 0 ? void 0 : MediaRecorder.isTypeSupported) == null)
            return null;
        const foundSupportedType = possibleMimeTypes.find(type => MediaRecorder.isTypeSupported(type));
        return foundSupportedType !== null && foundSupportedType !== void 0 ? foundSupportedType : null;
    }
    onSuccessfullyStartedRecording(stream) {
        this.pendingResult = new Promise((resolve, reject) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onerror = () => {
                reject(failedToRecordError());
                this.prepareInstanceForNextOperation();
            };
            this.mediaRecorder.onstop = async () => {
                const mimeType = VoiceRecorderImpl.getSupportedMimeType();
                if (mimeType == null) {
                    reject(failedToFetchRecordingError());
                }
                else {
                    const blobVoiceRecording = new Blob(this.chunks, { 'type': mimeType });
                    const recordDataBase64 = await VoiceRecorderImpl.blobToBase64(blobVoiceRecording);
                    const recordingDuration = await getBlobDuration(blobVoiceRecording);
                    this.prepareInstanceForNextOperation();
                    resolve({ value: { recordDataBase64, mimeType, msDuration: recordingDuration * 1000 } });
                }
            };
            this.mediaRecorder.ondataavailable = (event) => this.chunks.push(event.data);
            this.mediaRecorder.start();
        });
    }
    onFailedToStartRecording() {
        this.prepareInstanceForNextOperation();
        throw failedToRecordError();
    }
    static blobToBase64(blob) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const recordingResult = String(reader.result);
                const splitResult = recordingResult.split('base64,');
                const toResolve = (splitResult.length > 1) ? splitResult[1] : recordingResult;
                resolve(toResolve.trim());
            };
            reader.readAsDataURL(blob);
        });
    }
    prepareInstanceForNextOperation() {
        if (this.mediaRecorder != null && this.mediaRecorder.state === 'recording') {
            try {
                this.mediaRecorder.stop();
            }
            catch (ignore) { }
        }
        this.pendingResult = neverResolvingPromise();
        this.mediaRecorder = null;
        this.chunks = [];
    }
}
//# sourceMappingURL=VoiceRecorderImpl.js.map