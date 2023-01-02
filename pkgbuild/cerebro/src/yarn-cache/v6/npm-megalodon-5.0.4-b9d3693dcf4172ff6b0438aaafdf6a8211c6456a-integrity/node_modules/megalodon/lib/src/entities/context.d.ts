/// <reference path="status.d.ts" />
declare namespace Entity {
    type Context = {
        ancestors: Array<Status>;
        descendants: Array<Status>;
    };
}
