declare namespace MisskeyEntity {
    type Choice = {
        text: string;
        votes: number;
        isVoted: boolean;
    };
    type Poll = {
        multiple: boolean;
        expiresAt: string;
        choices: Array<Choice>;
    };
}
