export interface NestedMap<T> {
    value?: T;
    children?: Map<string, NestedMap<T>>;
}
export declare function setToMap<T>(map: NestedMap<T>, path: string[], value: T): void;
