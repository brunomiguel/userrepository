/// <reference types="node" />
import EventEmitter from "events";
import { TokenHandler } from "./tokenHandler";
import { PositionHolder } from "./positionHolder";
import { ConstructorConfig, Token, CanvazResponse, LyricsResponse } from "./types";
import { PlayerEvent, PlayerEventTypes, TokenScope } from "./types";
export declare function safe_execution(_: unknown, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
export declare abstract class GenericPlayer {
    protected tokenHandler: TokenHandler;
    protected _positionHolder: PositionHolder;
    eventEmitter: EventEmitter;
    protected playerInstance: PlayerNativeObject | undefined;
    protected _volume: number;
    protected device_id: string;
    protected _isInitialized: boolean;
    get isInitialized(): boolean;
    protected abstract onPlayerInitialized(): void;
    private validateConfig;
    constructor(config: ConstructorConfig, playerConstructMethod?: "create_player" | "create_player_spirc");
    private player_event_callback;
    private registerListeners;
    on: <T extends PlayerEventTypes>(event: T, callback: (event: PlayerEvent<T>) => void) => EventEmitter;
    off: <T extends PlayerEventTypes>(event: T, callback: (event: PlayerEvent<T>) => void) => EventEmitter;
    addListener<T extends PlayerEventTypes>(event: T, callback: (event: PlayerEvent<T>) => void): EventEmitter;
    removeListener<T extends PlayerEventTypes>(event: T, callback: (event: PlayerEvent<T>) => void): EventEmitter;
    once<T extends PlayerEventTypes>(event: T, callback: (event: PlayerEvent<T>) => void): EventEmitter;
    removeAllListeners(): void;
    getDeviceId(): string;
    protected validateUri(val: string): [string | undefined, string | undefined];
    abstract setVolume(volume: number, raw?: boolean): Promise<void>;
    abstract load(trackURIs: string | string[], autoPlay?: boolean, startPosition?: number): Promise<void>;
    abstract getToken(...scopes: TokenScope[]): Promise<Token | undefined>;
    abstract getVolume(raw?: boolean): number;
    abstract seek(posMs: number): Promise<void>;
    abstract close(): Promise<void>;
    abstract getCurrentPosition(): number;
    abstract getCanvas(track: string): Promise<CanvazResponse | undefined>;
    abstract getLyrics(track: string): Promise<LyricsResponse | undefined>;
}
