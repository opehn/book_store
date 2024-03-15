export interface Order {
    items: BookItem[];
    delivery: DeliveryDetails;
    totalPrice: string;
    totalQuantity: string;
    bookTitle: string;
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

const items = [{ "bookid": 1, "quantity": 1, "order_id": 1 }]


function makeBookIds(orderData: Order): number[] {
    try {
        let bookIds: number[] = orderData.items.map((cur: BookItem) => (parseInt(cur.bookId)));
        return bookIds;
    } catch (e) {
        throw e;
    }
}




function handlePayment(userId: number, orderData: Order): Promise<void> {
    const bookIds = this.makeBookIds(orderData);
    const deliveryId = await this.orderRepository.intsertDelivery(userId, orderData);

    const orderId = this.orderRepository.insertOrder(userId, orderData, deliveryId[0]);

    let newItems: OrderedBookItem[] = orderData.items.map((cur: any) => ({
        'book_id': cur.book_id,
        'quantity': cur.quantity,
        'order_id': orderId[0]
    }));

    this.orderRepository.insertOrderedBook(newItems)

    //deleteCart
    await this.orderRepository.deleteCart(userId, bookIds);



}