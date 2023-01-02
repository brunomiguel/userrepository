export declare class RequestCanceledError extends Error {
    isCancel: boolean;
    constructor(msg: string);
}
export declare const isCancel: (value: any) => boolean;
