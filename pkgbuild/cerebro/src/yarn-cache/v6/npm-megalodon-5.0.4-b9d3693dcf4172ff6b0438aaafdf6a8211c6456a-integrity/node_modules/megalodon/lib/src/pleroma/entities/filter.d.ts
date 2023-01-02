declare namespace PleromaEntity {
    type Filter = {
        id: string;
        phrase: string;
        context: Array<FilterContext>;
        expires_at: string | null;
        irreversible: boolean;
        whole_word: boolean;
    };
    type FilterContext = string;
}
