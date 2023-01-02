declare namespace PleromaEntity {
    type ScheduledStatus = {
        id: string;
        scheduled_at: string;
        params: object;
        media_attachments: Array<Attachment>;
    };
}
