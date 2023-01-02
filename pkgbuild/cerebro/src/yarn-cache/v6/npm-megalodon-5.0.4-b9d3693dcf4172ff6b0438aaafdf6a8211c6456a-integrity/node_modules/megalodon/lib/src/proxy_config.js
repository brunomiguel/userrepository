"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var https_proxy_agent_1 = require("https-proxy-agent");
var socks_proxy_agent_1 = require("socks-proxy-agent");
var ProxyProtocolError = (function (_super) {
    __extends(ProxyProtocolError, _super);
    function ProxyProtocolError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProxyProtocolError;
}(Error));
var proxyAgent = function (proxyConfig) {
    switch (proxyConfig.protocol) {
        case 'http': {
            var options = {
                host: proxyConfig.host,
                port: proxyConfig.port,
                secureProxy: false
            };
            if (proxyConfig.auth) {
                options = Object.assign(options, {
                    auth: "".concat(proxyConfig.auth.username, ":").concat(proxyConfig.auth.password)
                });
            }
            var httpsAgent = new https_proxy_agent_1.HttpsProxyAgent(options);
            return httpsAgent;
        }
        case 'https': {
            var options = {
                host: proxyConfig.host,
                port: proxyConfig.port,
                secureProxy: true
            };
            if (proxyConfig.auth) {
                options = Object.assign(options, {
                    auth: "".concat(proxyConfig.auth.username, ":").concat(proxyConfig.auth.password)
                });
            }
            var httpsAgent = new https_proxy_agent_1.HttpsProxyAgent(options);
            return httpsAgent;
        }
        case 'socks4':
        case 'socks4a': {
            var options = {
                type: 4,
                hostname: proxyConfig.host,
                port: proxyConfig.port
            };
            if (proxyConfig.auth) {
                options = Object.assign(options, {
                    userId: proxyConfig.auth.username,
                    password: proxyConfig.auth.password
                });
            }
            var socksAgent = new socks_proxy_agent_1.SocksProxyAgent(options);
            return socksAgent;
        }
        case 'socks5':
        case 'socks5h':
        case 'socks': {
            var options = {
                type: 5,
                hostname: proxyConfig.host,
                port: proxyConfig.port
            };
            if (proxyConfig.auth) {
                options = Object.assign(options, {
                    userId: proxyConfig.auth.username,
                    password: proxyConfig.auth.password
                });
            }
            var socksAgent = new socks_proxy_agent_1.SocksProxyAgent(options);
            return socksAgent;
        }
        default:
            throw new ProxyProtocolError('protocol is not accepted');
    }
};
exports.default = proxyAgent;
