/// <reference path="userDetail.d.ts" />
declare namespace MisskeyEntity {
    type Mute = {
        id: string;
        createdAt: string;
        muteeId: string;
        mutee: UserDetail;
    };
}
