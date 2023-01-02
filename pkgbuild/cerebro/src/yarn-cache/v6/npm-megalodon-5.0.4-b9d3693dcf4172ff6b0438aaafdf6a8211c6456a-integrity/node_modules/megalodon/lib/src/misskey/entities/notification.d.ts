/// <reference path="user.d.ts" />
/// <reference path="note.d.ts" />
declare namespace MisskeyEntity {
    type Notification = {
        id: string;
        createdAt: string;
        type: NotificationType;
        userId: string;
        user: User;
        note?: Note;
        reaction?: string;
    };
    type NotificationType = string;
}
