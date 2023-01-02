/// <reference path="account.d.ts" />
/// <reference path="application.d.ts" />
/// <reference path="mention.d.ts" />
/// <reference path="tag.d.ts" />
/// <reference path="attachment.d.ts" />
/// <reference path="emoji.d.ts" />
/// <reference path="card.d.ts" />
/// <reference path="poll.d.ts" />
/// <reference path="reaction.d.ts" />
declare namespace Entity {
    type Status = {
        id: string;
        uri: string;
        url: string;
        account: Account;
        in_reply_to_id: string | null;
        in_reply_to_account_id: string | null;
        reblog: Status | null;
        content: string;
        plain_content: string | null;
        created_at: string;
        emojis: Emoji[];
        replies_count: number;
        reblogs_count: number;
        favourites_count: number;
        reblogged: boolean | null;
        favourited: boolean | null;
        muted: boolean | null;
        sensitive: boolean;
        spoiler_text: string;
        visibility: 'public' | 'unlisted' | 'private' | 'direct';
        media_attachments: Array<Attachment>;
        mentions: Array<Mention>;
        tags: Array<Tag>;
        card: Card | null;
        poll: Poll | null;
        application: Application | null;
        language: string | null;
        pinned: boolean | null;
        emoji_reactions: Array<Reaction>;
        quote: boolean;
        bookmarked: boolean;
    };
}
