"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_client_1 = __importDefault(require("@/mastodon/api_client"));
var notification_1 = __importDefault(require("@/notification"));
var notification_2 = __importDefault(require("@/mastodon/notification"));
describe('api_client', function () {
    describe('notification', function () {
        describe('encode', function () {
            it('megalodon notification type should be encoded to mastodon notification type', function () {
                var cases = [
                    {
                        src: notification_1.default.Follow,
                        dist: notification_2.default.Follow
                    },
                    {
                        src: notification_1.default.Favourite,
                        dist: notification_2.default.Favourite
                    },
                    {
                        src: notification_1.default.Reblog,
                        dist: notification_2.default.Reblog
                    },
                    {
                        src: notification_1.default.Mention,
                        dist: notification_2.default.Mention
                    },
                    {
                        src: notification_1.default.PollExpired,
                        dist: notification_2.default.Poll
                    },
                    {
                        src: notification_1.default.FollowRequest,
                        dist: notification_2.default.FollowRequest
                    },
                    {
                        src: notification_1.default.Status,
                        dist: notification_2.default.Status
                    }
                ];
                cases.forEach(function (c) {
                    expect(api_client_1.default.Converter.encodeNotificationType(c.src)).toEqual(c.dist);
                });
            });
        });
        describe('decode', function () {
            it('mastodon notification type should be decoded to megalodon notification type', function () {
                var cases = [
                    {
                        src: notification_2.default.Follow,
                        dist: notification_1.default.Follow
                    },
                    {
                        src: notification_2.default.Favourite,
                        dist: notification_1.default.Favourite
                    },
                    {
                        src: notification_2.default.Mention,
                        dist: notification_1.default.Mention
                    },
                    {
                        src: notification_2.default.Reblog,
                        dist: notification_1.default.Reblog
                    },
                    {
                        src: notification_2.default.Poll,
                        dist: notification_1.default.PollExpired
                    },
                    {
                        src: notification_2.default.FollowRequest,
                        dist: notification_1.default.FollowRequest
                    }
                ];
                cases.forEach(function (c) {
                    expect(api_client_1.default.Converter.decodeNotificationType(c.src)).toEqual(c.dist);
                });
            });
        });
    });
});
