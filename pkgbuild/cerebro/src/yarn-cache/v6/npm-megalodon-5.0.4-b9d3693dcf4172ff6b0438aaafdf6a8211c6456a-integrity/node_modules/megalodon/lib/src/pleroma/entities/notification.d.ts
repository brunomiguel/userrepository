/// <reference path="account.d.ts" />
/// <reference path="status.d.ts" />
declare namespace PleromaEntity {
    type Notification = {
        account: Account;
        created_at: string;
        id: string;
        status?: Status;
        emoji?: string;
        type: NotificationType;
    };
    type NotificationType = string;
}
