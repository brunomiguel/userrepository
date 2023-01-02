/// <reference path="account.d.ts" />
/// <reference path="status.d.ts" />
declare namespace MastodonEntity {
    type Notification = {
        account: Account;
        created_at: string;
        id: string;
        status?: Status;
        type: NotificationType;
    };
    type NotificationType = string;
}
