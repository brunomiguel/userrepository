/// <reference path="history.d.ts" />
declare namespace Entity {
    type Tag = {
        name: string;
        url: string;
        history: Array<History> | null;
    };
}
