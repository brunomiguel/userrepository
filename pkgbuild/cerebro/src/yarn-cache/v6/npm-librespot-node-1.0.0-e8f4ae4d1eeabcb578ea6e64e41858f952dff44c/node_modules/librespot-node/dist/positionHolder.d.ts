export declare class PositionHolder {
    position: number;
    private positionListener;
    private updateInterval;
    callback?: (time: number) => void;
    constructor(updateInterval?: number);
    setListener(): void;
    clearListener(): void;
}
