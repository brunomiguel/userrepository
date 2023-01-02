/// <reference path="note.d.ts" />
declare namespace MisskeyEntity {
    type Favorite = {
        id: string;
        createdAt: string;
        noteId: string;
        note: Note;
    };
}
