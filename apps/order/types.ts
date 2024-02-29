export type OrderedBookItem = {
    book_id: number,
    count: number,
    order_id: number
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

export interface Order {
    items: BookItem[];
    delivery: DeliveryDetails;
    totalPrice: string;
    totalCount: string;
    bookTitle: string;
}