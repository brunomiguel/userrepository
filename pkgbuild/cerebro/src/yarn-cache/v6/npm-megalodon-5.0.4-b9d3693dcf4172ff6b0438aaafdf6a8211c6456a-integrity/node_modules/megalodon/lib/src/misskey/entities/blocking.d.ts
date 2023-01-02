/// <reference path="userDetail.d.ts" />
declare namespace MisskeyEntity {
    type Blocking = {
        id: string;
        createdAt: string;
        blockeeId: string;
        blockee: UserDetail;
    };
}
