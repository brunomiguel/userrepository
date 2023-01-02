declare namespace OAuth {
    type AppDataFromServer = {
        id: string;
        name: string;
        website: string | null;
        redirect_uri: string;
        client_id: string;
        client_secret: string;
    };
    type TokenDataFromServer = {
        access_token: string;
        token_type: string;
        scope: string;
        created_at: number;
        expires_in: number | null;
        refresh_token: string | null;
    };
    class AppData {
        id: string;
        name: string;
        website: string | null;
        redirect_uri: string;
        client_id: string;
        client_secret: string;
        url: string | null;
        session_token: string | null;
        constructor(id: string, name: string, website: string | null, redirect_uri: string, client_id: string, client_secret: string);
        static from(raw: AppDataFromServer): AppData;
        get redirectUri(): string;
        get clientId(): string;
        get clientSecret(): string;
    }
    class TokenData {
        access_token: string;
        token_type: string;
        created_at: number;
        expires_in: number | null;
        refresh_token: string | null;
        _scope: string;
        constructor(access_token: string, token_type: string, scope: string, created_at: number, expires_in?: number | null, refresh_token?: string | null);
        static from(raw: TokenDataFromServer): TokenData;
        get accessToken(): string;
        get tokenType(): string;
        get scope(): string;
        get createdAt(): number;
        get expiresIn(): number | null;
        get refreshToken(): string | null;
    }
}
export default OAuth;
