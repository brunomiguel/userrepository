/// <reference path="status.d.ts" />
declare namespace PleromaEntity {
    type Context = {
        ancestors: Array<Status>;
        descendants: Array<Status>;
    };
}
