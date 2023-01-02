/// <reference path="emoji.d.ts" />
declare namespace MisskeyEntity {
    type User = {
        id: string;
        name: string;
        username: string;
        host: string | null;
        avatarUrl: string;
        avatarColor: string;
        emojis: Array<Emoji>;
    };
}
