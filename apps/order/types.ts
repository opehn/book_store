export type OrderedBookItem = {
    bookId: number,
    quantity: number,
    orderId: number
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