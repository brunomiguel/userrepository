import { ConstructorConfig } from "./types";
import { TokenScope } from "./types";
import { GenericPlayer } from "./genericPlayer";
export declare class SpotifyPlayerSpirc extends GenericPlayer {
    protected onPlayerInitialized(): void;
    constructor(config: ConstructorConfig);
    play(): Promise<void>;
    pause(): Promise<void>;
    seek(posMs: number): Promise<void>;
    close(): Promise<void>;
    getCurrentPosition(): number;
    setVolume(volume: number, raw?: boolean): Promise<void>;
    getVolume(raw?: boolean): number;
    load(trackURI: string, autoplay?: boolean): Promise<void>;
    addToQueue(trackURI: string): Promise<void>;
    getToken(...scopes: TokenScope[]): Promise<any>;
    getCanvas(track: string): Promise<import("./types").CanvazResponse | undefined>;
    getLyrics(track: string): Promise<any>;
}
