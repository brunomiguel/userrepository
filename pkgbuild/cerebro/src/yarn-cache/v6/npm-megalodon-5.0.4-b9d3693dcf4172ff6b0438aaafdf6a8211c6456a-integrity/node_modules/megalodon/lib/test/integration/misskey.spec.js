"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var notification_1 = __importDefault(require("@/misskey/notification"));
var misskey_1 = __importDefault(require("@/misskey"));
var notification_2 = __importDefault(require("@/notification"));
var axios_1 = __importDefault(require("axios"));
jest.mock('axios');
var user = {
    id: '1',
    name: 'test_user',
    username: 'TestUser',
    host: 'misskey.io',
    avatarUrl: 'https://example.com/icon.png',
    avatarColor: '#000000',
    emojis: []
};
var note = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: '1',
    user: user,
    text: 'hogehoge',
    cw: null,
    visibility: 'public',
    renoteCount: 0,
    repliesCount: 0,
    reactions: {},
    emojis: [],
    fileIds: [],
    files: [],
    replyId: null,
    renoteId: null
};
var follow = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.Follow
};
var mention = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.Mention,
    note: note
};
var reply = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.Reply,
    note: note
};
var renote = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.Renote,
    note: note
};
var quote = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.Quote,
    note: note
};
var reaction = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.Reaction,
    note: note,
    reaction: '♥'
};
var pollVote = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.PollVote,
    note: note
};
var receiveFollowRequest = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.ReceiveFollowRequest
};
var followRequestAccepted = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.FollowRequestAccepted
};
var groupInvited = {
    id: '1',
    createdAt: '2021-02-01T01:49:29',
    userId: user.id,
    user: user,
    type: notification_1.default.GroupInvited
};
axios_1.default.CancelToken.source.mockImplementation(function () {
    return {
        token: {
            throwIfRequested: function () { },
            promise: {
                then: function () { },
                catch: function () { }
            }
        }
    };
});
describe('getNotifications', function () {
    var client = new misskey_1.default('http://localhost', 'sample token');
    var cases = [
        {
            event: follow,
            expected: notification_2.default.Follow,
            title: 'follow'
        },
        {
            event: mention,
            expected: notification_2.default.Mention,
            title: 'mention'
        },
        {
            event: reply,
            expected: notification_2.default.Mention,
            title: 'reply'
        },
        {
            event: renote,
            expected: notification_2.default.Reblog,
            title: 'renote'
        },
        {
            event: quote,
            expected: notification_2.default.Reblog,
            title: 'quote'
        },
        {
            event: reaction,
            expected: notification_2.default.EmojiReaction,
            title: 'reaction'
        },
        {
            event: pollVote,
            expected: notification_2.default.PollVote,
            title: 'pollVote'
        },
        {
            event: receiveFollowRequest,
            expected: notification_2.default.FollowRequest,
            title: 'receiveFollowRequest'
        },
        {
            event: followRequestAccepted,
            expected: notification_2.default.Follow,
            title: 'followRequestAccepted'
        },
        {
            event: groupInvited,
            expected: notification_1.default.GroupInvited,
            title: 'groupInvited'
        }
    ];
    cases.forEach(function (c) {
        it("should be ".concat(c.title, " event"), function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockResponse, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockResponse = {
                            data: [c.event],
                            status: 200,
                            statusText: '200OK',
                            headers: {},
                            config: {}
                        };
                        axios_1.default.post.mockResolvedValue(mockResponse);
                        return [4, client.getNotifications()];
                    case 1:
                        res = _a.sent();
                        expect(res.data[0].type).toEqual(c.expected);
                        return [2];
                }
            });
        }); });
    });
});
