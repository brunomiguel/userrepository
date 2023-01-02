/// <reference path="status.d.ts" />
declare namespace MastodonEntity {
    type Context = {
        ancestors: Array<Status>;
        descendants: Array<Status>;
    };
}
