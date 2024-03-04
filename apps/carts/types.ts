export type Cart = {
    id: number,
    book_id: number,
    title: string,
    summary: string,
    quantity: number
    price: number,
}


export type CartDTO = {
    id: number;
    bookId: number;
    title: string;
    summary: string;
    quantity: number;
    price: number;
}