"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OAuth;
(function (OAuth) {
    var AppData = (function () {
        function AppData(id, name, website, redirect_uri, client_id, client_secret) {
            this.id = id;
            this.name = name;
            this.website = website;
            this.redirect_uri = redirect_uri;
            this.client_id = client_id;
            this.client_secret = client_secret;
            this.url = null;
            this.session_token = null;
        }
        AppData.from = function (raw) {
            return new this(raw.id, raw.name, raw.website, raw.redirect_uri, raw.client_id, raw.client_secret);
        };
        Object.defineProperty(AppData.prototype, "redirectUri", {
            get: function () {
                return this.redirect_uri;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppData.prototype, "clientId", {
            get: function () {
                return this.client_id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppData.prototype, "clientSecret", {
            get: function () {
                return this.client_secret;
            },
            enumerable: false,
            configurable: true
        });
        return AppData;
    }());
    OAuth.AppData = AppData;
    var TokenData = (function () {
        function TokenData(access_token, token_type, scope, created_at, expires_in, refresh_token) {
            if (expires_in === void 0) { expires_in = null; }
            if (refresh_token === void 0) { refresh_token = null; }
            this.access_token = access_token;
            this.token_type = token_type;
            this.created_at = created_at;
            this.expires_in = expires_in;
            this.refresh_token = refresh_token;
            this._scope = scope;
        }
        TokenData.from = function (raw) {
            return new this(raw.access_token, raw.token_type, raw.scope, raw.created_at, raw.expires_in, raw.refresh_token);
        };
        Object.defineProperty(TokenData.prototype, "accessToken", {
            get: function () {
                return this.access_token;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TokenData.prototype, "tokenType", {
            get: function () {
                return this.token_type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TokenData.prototype, "scope", {
            get: function () {
                return this._scope;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TokenData.prototype, "createdAt", {
            get: function () {
                return this.created_at;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TokenData.prototype, "expiresIn", {
            get: function () {
                return this.expires_in;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TokenData.prototype, "refreshToken", {
            get: function () {
                return this.refresh_token;
            },
            enumerable: false,
            configurable: true
        });
        return TokenData;
    }());
    OAuth.TokenData = TokenData;
})(OAuth || (OAuth = {}));
exports.default = OAuth;
