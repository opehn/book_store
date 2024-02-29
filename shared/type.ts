export interface myResponse {
    data?: any;
    message?: string | null;
    error?: string | null;
}

export interface UserToken {
    userId: number,
    email: string,
    name: string
}
