/// <reference path="account.d.ts" />
/// <reference path="status.d.ts" />
declare namespace PleromaEntity {
    type Conversation = {
        id: string;
        accounts: Array<Account>;
        last_status: Status | null;
        unread: boolean;
    };
}
