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
exports.Parser = void 0;
var events_1 = require("events");
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        var _this = _super.call(this) || this;
        _this.message = '';
        return _this;
    }
    Parser.prototype.parse = function (chunk) {
        if (chunk === ':thump\n') {
            this.emit('heartbeat', {});
            return;
        }
        this.message += chunk;
        chunk = this.message;
        var size = chunk.length;
        var start = 0;
        var offset = 0;
        var curr;
        var next;
        while (offset < size) {
            curr = chunk[offset];
            next = chunk[offset + 1];
            if (curr === '\n' && next === '\n') {
                var piece = chunk.slice(start, offset);
                offset += 2;
                start = offset;
                if (!piece.length)
                    continue;
                var root = piece.split('\n');
                if (root.length !== 2)
                    continue;
                var event_1 = root[0].substr(7);
                var data = root[1].substr(6);
                var jsonObj = {};
                try {
                    jsonObj = JSON.parse(data);
                }
                catch (err) {
                    if (event_1 !== 'delete') {
                        this.emit('error', new Error("Error parsing API reply: '".concat(piece, "', error message: '").concat(err, "'")));
                        continue;
                    }
                }
                switch (event_1) {
                    case 'update':
                        this.emit('update', jsonObj);
                        break;
                    case 'notification':
                        this.emit('notification', jsonObj);
                        break;
                    case 'conversation':
                        this.emit('conversation', jsonObj);
                        break;
                    case 'delete':
                        this.emit('delete', data);
                        break;
                    default:
                        this.emit('error', new Error("Unknown event has received: ".concat(event_1)));
                        continue;
                }
            }
            offset++;
        }
        this.message = chunk.slice(start, size);
    };
    return Parser;
}(events_1.EventEmitter));
exports.Parser = Parser;
