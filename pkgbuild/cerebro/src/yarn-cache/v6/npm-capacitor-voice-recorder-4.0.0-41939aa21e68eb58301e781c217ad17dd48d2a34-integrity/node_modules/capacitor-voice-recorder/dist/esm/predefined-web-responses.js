export const successResponse = () => ({ value: true });
export const failureResponse = () => ({ value: false });
export const missingPermissionError = () => new Error('MISSING_PERMISSION');
export const alreadyRecordingError = () => new Error('ALREADY_RECORDING');
export const microphoneBeingUsedError = () => new Error('MICROPHONE_BEING_USED');
export const deviceCannotVoiceRecordError = () => new Error('DEVICE_CANNOT_VOICE_RECORD');
export const failedToRecordError = () => new Error('FAILED_TO_RECORD');
export const recordingHasNotStartedError = () => new Error('RECORDING_HAS_NOT_STARTED');
export const failedToFetchRecordingError = () => new Error('FAILED_TO_FETCH_RECORDING');
export const couldNotQueryPermissionStatusError = () => new Error('COULD_NOT_QUERY_PERMISSION_STATUS');
//# sourceMappingURL=predefined-web-responses.js.map