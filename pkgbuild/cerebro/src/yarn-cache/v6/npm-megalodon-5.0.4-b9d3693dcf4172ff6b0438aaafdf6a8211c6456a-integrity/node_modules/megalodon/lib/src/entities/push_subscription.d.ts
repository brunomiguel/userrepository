declare namespace Entity {
    type PushSubscription = {
        id: string;
        endpoint: string;
        server_key: string;
        alerts: object;
    };
}
