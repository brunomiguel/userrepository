"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MastodonNotificationType;
(function (MastodonNotificationType) {
    MastodonNotificationType.Mention = 'mention';
    MastodonNotificationType.Reblog = 'reblog';
    MastodonNotificationType.Favourite = 'favourite';
    MastodonNotificationType.Follow = 'follow';
    MastodonNotificationType.Poll = 'poll';
    MastodonNotificationType.FollowRequest = 'follow_request';
    MastodonNotificationType.Status = 'status';
})(MastodonNotificationType || (MastodonNotificationType = {}));
exports.default = MastodonNotificationType;
