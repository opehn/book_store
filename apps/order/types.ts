export type OrderDTO = {
    id: number;
    createdAt: string;
    address: string;
    receiver: string;
    contact: string;
    bookTitle: string;
    totalQuantity: number;
    totalPrice: number;
}

export type OrderDetailDTO = {
    id: number;
    title: string;
    author: string;
    price: number;
    quantity: number;
}

export type OrderDetail = {
    book_id: number;
    title: string;
    author: string;
    price: number;
    quantity: number;
}


export type OrderedBookItem = {
    book_id: number,
    quantity: number,
    order_id: number
}

export interface BookItem {
    bookId: string;
    quantity: string;
}

export interface DeliveryDetails {
    address: string;
    receiver: string;
    contact: string;
}

export interface UserOrder {
    id: number,
    created_at: string,
    book_title: string,
    total_quantity: number,
    total_price: number,
    delivery_id: number,
    address: string,
    receiver: string,
    contact: string
}

export interface Order {
    items: BookItem[];
    delivery: DeliveryDetails;
    totalPrice: string;
    totalQuantity: string;
    bookTitle: string;
}