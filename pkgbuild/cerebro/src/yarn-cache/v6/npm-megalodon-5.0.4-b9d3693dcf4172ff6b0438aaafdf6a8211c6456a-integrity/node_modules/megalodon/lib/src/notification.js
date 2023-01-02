"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotificationType;
(function (NotificationType) {
    NotificationType.Follow = 'follow';
    NotificationType.Favourite = 'favourite';
    NotificationType.Reblog = 'reblog';
    NotificationType.Mention = 'mention';
    NotificationType.EmojiReaction = 'emoji_reaction';
    NotificationType.FollowRequest = 'follow_request';
    NotificationType.Status = 'status';
    NotificationType.PollVote = 'poll_vote';
    NotificationType.PollExpired = 'poll_expired';
})(NotificationType || (NotificationType = {}));
exports.default = NotificationType;
