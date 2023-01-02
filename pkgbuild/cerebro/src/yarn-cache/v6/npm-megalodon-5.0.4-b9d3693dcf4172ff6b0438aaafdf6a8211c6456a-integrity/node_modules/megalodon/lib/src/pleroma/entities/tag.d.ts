/// <reference path="history.d.ts" />
declare namespace PleromaEntity {
    type Tag = {
        name: string;
        url: string;
        history: Array<History> | null;
    };
}
