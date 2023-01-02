/// <reference types="node" />
import WS from 'ws';
import { EventEmitter } from 'events';
import { ProxyConfig } from '../proxy_config';
import { WebSocketInterface } from '../megalodon';
export default class WebSocket extends EventEmitter implements WebSocketInterface {
    url: string;
    stream: string;
    params: string | null;
    parser: Parser;
    headers: {
        [key: string]: string;
    };
    proxyConfig: ProxyConfig | false;
    private _accessToken;
    private _reconnectInterval;
    private _reconnectMaxAttempts;
    private _reconnectCurrentAttempts;
    private _connectionClosed;
    private _client;
    private _pongReceivedTimestamp;
    private _heartbeatInterval;
    private _pongWaiting;
    constructor(url: string, stream: string, params: string | undefined, accessToken: string, userAgent: string, proxyConfig?: ProxyConfig | false);
    start(): void;
    private _startWebSocketConnection;
    stop(): void;
    private _resetConnection;
    private _resetRetryParams;
    private _reconnect;
    private _connect;
    private _clearBinding;
    private _bindSocket;
    private _setupParser;
    private _checkAlive;
}
export declare class Parser extends EventEmitter {
    parse(data: WS.Data, isBinary: boolean): void;
}
