declare namespace MastodonEntity {
    type PushSubscription = {
        id: string;
        endpoint: string;
        server_key: string;
        alerts: object;
    };
}
