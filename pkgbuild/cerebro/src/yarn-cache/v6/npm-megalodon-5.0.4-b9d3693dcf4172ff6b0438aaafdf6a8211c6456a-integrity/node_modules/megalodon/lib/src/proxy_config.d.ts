import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
export type ProxyConfig = {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol: 'http' | 'https' | 'socks4' | 'socks4a' | 'socks5' | 'socks5h' | 'socks';
};
declare const proxyAgent: (proxyConfig: ProxyConfig) => HttpsProxyAgent | SocksProxyAgent;
export default proxyAgent;
