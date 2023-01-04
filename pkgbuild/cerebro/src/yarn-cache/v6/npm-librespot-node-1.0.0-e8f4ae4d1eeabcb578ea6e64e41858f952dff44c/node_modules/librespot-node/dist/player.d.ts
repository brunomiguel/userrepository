import { TokenScope } from "./types";
import { GenericPlayer } from "./genericPlayer";
export declare class SpotifyPlayer extends GenericPlayer {
    protected onPlayerInitialized(): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    seek(posMs: number): Promise<void>;
    close(): Promise<void>;
    getCurrentPosition(): number;
    setVolume(volume: number, raw?: boolean): Promise<void>;
    getVolume(raw?: boolean): number;
    load(trackURIs: string | string[], autoPlay?: boolean, startPosition?: number): Promise<void>;
    getToken(...scopes: TokenScope[]): Promise<any>;
    getCanvas(track: string): Promise<import("./types").CanvazResponse | undefined>;
    getLyrics(track: string): Promise<any>;
}
