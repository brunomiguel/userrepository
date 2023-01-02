/// <reference path="userDetail.d.ts" />
declare namespace MisskeyEntity {
    type Follower = {
        id: string;
        createdAt: string;
        followeeId: string;
        followerId: string;
        follower: UserDetail;
    };
}
