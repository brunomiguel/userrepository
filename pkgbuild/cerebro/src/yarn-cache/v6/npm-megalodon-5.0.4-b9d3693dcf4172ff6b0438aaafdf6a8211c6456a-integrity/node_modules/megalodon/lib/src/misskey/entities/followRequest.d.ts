/// <reference path="user.d.ts" />
declare namespace MisskeyEntity {
    type FollowRequest = {
        id: string;
        follower: User;
        followee: User;
    };
}
