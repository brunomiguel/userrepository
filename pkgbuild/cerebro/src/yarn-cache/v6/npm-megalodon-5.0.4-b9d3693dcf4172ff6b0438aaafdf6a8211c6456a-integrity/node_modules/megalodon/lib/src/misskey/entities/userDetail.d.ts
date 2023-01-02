/// <reference path="emoji.d.ts" />
/// <reference path="note.d.ts" />
declare namespace MisskeyEntity {
    type UserDetail = {
        id: string;
        name: string;
        username: string;
        host: string | null;
        avatarUrl: string;
        avatarColor: string;
        isAdmin: boolean;
        isModerator: boolean;
        isBot: boolean;
        isCat: boolean;
        emojis: Array<Emoji>;
        createdAt: string;
        bannerUrl: string;
        bannerColor: string;
        isLocked: boolean;
        isSilenced: boolean;
        isSuspended: boolean;
        description: string;
        followersCount: number;
        followingCount: number;
        notesCount: number;
        avatarId: string;
        bannerId: string;
        pinnedNoteIds?: Array<string>;
        pinnedNotes?: Array<Note>;
    };
}
