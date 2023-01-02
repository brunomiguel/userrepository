/// <reference path="userDetail.d.ts" />
declare namespace MisskeyEntity {
    type Following = {
        id: string;
        createdAt: string;
        followeeId: string;
        followerId: string;
        followee: UserDetail;
    };
}
