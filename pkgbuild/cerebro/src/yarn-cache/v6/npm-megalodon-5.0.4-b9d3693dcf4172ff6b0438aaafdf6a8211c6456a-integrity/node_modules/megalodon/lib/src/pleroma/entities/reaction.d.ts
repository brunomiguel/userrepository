/// <reference path="account.d.ts" />
declare namespace PleromaEntity {
    type Reaction = {
        count: number;
        me: boolean;
        name: string;
        accounts?: Array<Account>;
    };
}
