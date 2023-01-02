/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Parser extends EventEmitter {
    private message;
    constructor();
    parse(chunk: string): void;
}
