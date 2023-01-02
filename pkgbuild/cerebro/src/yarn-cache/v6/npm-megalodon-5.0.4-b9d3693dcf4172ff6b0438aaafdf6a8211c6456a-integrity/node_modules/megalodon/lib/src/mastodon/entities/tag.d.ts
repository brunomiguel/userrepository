/// <reference path="history.d.ts" />
declare namespace MastodonEntity {
    type Tag = {
        name: string;
        url: string;
        history: Array<History> | null;
    };
}
