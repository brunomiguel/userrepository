export interface NormalizationConfig {
    normalization: boolean;
    normalizationPregain: number;
    normalizationType: "auto" | "album" | "track";
    normalizationMethod: "dynamic" | "basic";
    normalizationAttackCF: number;
    normalizationKneeDB: number;
    normalizationReleaseCF: number;
    normalizationThreshold: number;
}
export interface ConnectConfig {
    name: string;
    deviceType: "computer" | "tablet" | "smartphone" | "speaker" | "tv" | "avr" | "stb" | "audiodongle" | "gameconsole" | "castaudio" | "castvideo" | "automobile" | "smartwatch" | "chromebook" | "carthing" | "homething";
    initialVolume: number;
    hasVolumeControl: boolean;
}
export interface CacheConfig {
    credentials_location?: string;
    volume_location?: string;
    audio_location?: string;
    size_limiter?: number;
}
export interface ConstructorConfig {
    auth: Partial<AuthDetails>;
    cache?: CacheConfig;
    pos_update_interval?: number;
    backend?: string;
    gapless?: boolean;
    bitrate?: "96" | "160" | "320";
    passThrough?: boolean;
    normalizationConfig?: Partial<NormalizationConfig>;
    connectConfig?: Partial<ConnectConfig>;
}
export interface AuthDetails {
    username: string;
    password: string;
    authType?: "AUTHENTICATION_USER_PASS" | "AUTHENTICATION_USER_PASS" | "AUTHENTICATION_STORED_FACEBOOK_CREDENTIALS" | "AUTHENTICATION_SPOTIFY_TOKEN" | "AUTHENTICATION_FACEBOOK_TOKEN";
}
export type PlayerEventTypes = "Stopped" | "Loading" | "Preloading" | "Playing" | "Paused" | "TimeToPreloadNextTrack" | "EndOfTrack" | "Unavailable" | "VolumeChanged" | "PositionCorrection" | "Seeked" | "FilterExplicitContentChanged" | "TrackChanged" | "SessionConnected" | "SessionDisconnected" | "SessionClientChanged" | "ShuffleChanged" | "RepeatChanged" | "AutoPlayChanged" | "PlayerInitialized" | "TimeUpdated" | "InitializationError";
export type PlayerEvent<T extends PlayerEventTypes = "InitializationError"> = {
    event: T;
} & (T extends "Stopped" ? {
    play_request_id: bigint;
    track_id: string;
} : T extends "Loading" ? {
    play_request_id: bigint;
    track_id: string;
    position_ms: number;
} : T extends "Preloading" ? {
    track_id: string;
} : T extends "Playing" ? {
    play_request_id: bigint;
    track_id: string;
    position_ms: number;
} : T extends "Paused" ? {
    play_request_id: bigint;
    track_id: string;
    position_ms: number;
} : T extends "TimeToPreloadNextTrack" ? {
    play_request_id: bigint;
    track_id: string;
} : T extends "EndOfTrack" ? {
    play_request_id: bigint;
    track_id: string;
} : T extends "Unavailable" ? {
    play_request_id: bigint;
    track_id: string;
} : T extends "VolumeChanged" ? {
    volume: number;
} : T extends "PositionCorrection" ? {
    play_request_id: bigint;
    track_id: string;
    position_ms: number;
} : T extends "Seeked" ? {
    play_request_id: bigint;
    track_id: string;
    position_ms: number;
} : T extends "TrackChanged" ? {
    audio_item: string;
} : T extends "SessionConnected" ? {
    connection_id: string;
    user_name: string;
} : T extends "SessionDisconnected" ? {
    connection_id: string;
    user_name: string;
} : T extends "SessionClientChanged" ? {
    client_id: string;
    client_name: string;
    client_brand_name: string;
    client_model_name: string;
} : T extends "ShuffleChanged" ? {
    shuffle: boolean;
} : T extends "RepeatChanged" ? {
    repeat: boolean;
} : T extends "AutoPlayChanged" ? {
    auto_play: boolean;
} : T extends "FilterExplicitContentChanged" ? {
    filter: boolean;
} : T extends "TimeUpdated" ? {
    position_ms: number;
} : T extends "PlayerInitialized" ? undefined : T extends "InitializationError" ? {
    error: Error;
} : unknown);
export type TokenScope = "ugc-image-upload" | "user-read-playback-state" | "user-modify-playback-state" | "user-read-currently-playing" | "app-remote-control" | "streaming" | "playlist-read-private" | "playlist-read-collaborative" | "playlist-modify-private" | "playlist-modify-public" | "user-follow-modify" | "user-follow-read" | "user-read-playback-position" | "user-top-read" | "user-read-recently-played" | "user-library-modify" | "user-library-read" | "user-read-email" | "user-read-private";
export type Token = {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    expiry_from_epoch: number;
    scopes: TokenScope[];
};
export interface CanvazResponse {
    canvases: Canvaz[];
    ttl_in_seconds: number;
}
export interface Canvaz {
    id: string;
    url: string;
    file_id: string;
    entity_uri: string;
    explicit: boolean;
    uploaded_by: string;
    etag: string;
    canvas_uri: string;
    storylines_id: string;
    type_: number;
    artist: Artist;
}
export interface Artist {
    uri: string;
    name: string;
    avatar: string;
}
export interface LyricsResponse {
    lyrics: Lyrics;
    colors: Colors;
    hasVocalRemoval: boolean;
}
export interface Lyrics {
    syncType: string;
    lines: Line[];
    provider: string;
    providerLyricsId: string;
    providerDisplayName: string;
    syncLyricsUri: string;
    isDenseTypeface: boolean;
    alternatives: any[];
    language: string;
    isRtlLanguage: boolean;
    fullscreenAction: string;
}
export interface Line {
    startTimeMs: string;
    words: string;
    syllables: any[];
    endTimeMs: string;
}
export interface Colors {
    background: number;
    text: number;
    highlightText: number;
}
