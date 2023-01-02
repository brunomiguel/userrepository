"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MisskeyNotificationType;
(function (MisskeyNotificationType) {
    MisskeyNotificationType.Follow = 'follow';
    MisskeyNotificationType.Mention = 'mention';
    MisskeyNotificationType.Reply = 'reply';
    MisskeyNotificationType.Renote = 'renote';
    MisskeyNotificationType.Quote = 'quote';
    MisskeyNotificationType.Reaction = 'reaction';
    MisskeyNotificationType.PollVote = 'pollVote';
    MisskeyNotificationType.ReceiveFollowRequest = 'receiveFollowRequest';
    MisskeyNotificationType.FollowRequestAccepted = 'followRequestAccepted';
    MisskeyNotificationType.GroupInvited = 'groupInvited';
})(MisskeyNotificationType || (MisskeyNotificationType = {}));
exports.default = MisskeyNotificationType;
