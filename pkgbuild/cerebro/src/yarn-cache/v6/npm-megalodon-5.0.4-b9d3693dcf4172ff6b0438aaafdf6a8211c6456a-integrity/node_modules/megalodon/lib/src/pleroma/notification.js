"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PleromaNotificationType;
(function (PleromaNotificationType) {
    PleromaNotificationType.Mention = 'mention';
    PleromaNotificationType.Reblog = 'reblog';
    PleromaNotificationType.Favourite = 'favourite';
    PleromaNotificationType.Follow = 'follow';
    PleromaNotificationType.Poll = 'poll';
    PleromaNotificationType.PleromaEmojiReaction = 'pleroma:emoji_reaction';
    PleromaNotificationType.FollowRequest = 'follow_request';
})(PleromaNotificationType || (PleromaNotificationType = {}));
exports.default = PleromaNotificationType;
