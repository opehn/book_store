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

export interface UserInfo {
    email: string,
    password: string,
    name: string,
    address: string,
    contact: string,
}

export interface Book {
    id: number;
    title: string;
    name: string;
    form: string;
    isbn: string;
    summary: string;
    author: string;
    pages: number;
    contents: string;
    pub_date: Date;
    detail: string;
    img: string;
}

export interface Item {
    bookId: number,
    count: number
}