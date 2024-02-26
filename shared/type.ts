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

export interface LoginInfo {
    email: string,
    password: string
}

export interface UserInfo {
    email: string,
    password: string,
    //name: string,
    //address: string,
    //contact: string,
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

export interface UserOrder {
    created_at: string,
    book_title: string,
    total_count: number,
    total_price: number,
    delivery_id: number,
    address: string,
    receiver: string,
    contact: string
}

export interface Cart {
    cartId: number,
    bookId: number,
    title: string,
    summary: string,
    img: string,
    price: number,
    count: number
}

export interface BookItem {
    bookId: string;
    count: string;
}

interface DeliveryDetails {
    address: string;
    receiver: string;
    contact: string;
}

export interface Order {
    items: BookItem[];
    delivery: DeliveryDetails;
    totalPrice: string;
    totalCount: string;
    bookTitle: string;
}