export interface Result {
    data?: any;
    message?: string;
    errror?: string;
}

export interface UserToken {
    userId: number,
    email: string,
    name: string
}

export interface LoginInfo {
    email: string,
    password: string
}