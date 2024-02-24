import { orderDb } from '../../data/dbAccess';
import { BookItem, Order } from '../../shared/type'

export default {
    getOrderList: async function getOrderList(userId: number) {
        try {
            let result = await orderDb.selectOrderList(userId);
            return result;
        } catch (e) {
            throw e;

        }
    },
    handlePayment: async function handlePayment(orderData: Order): Promise<number[]> {
        try {
            let bookIds: number[] = orderData.items.map((cur: BookItem) => (parseInt(cur.bookId)));
            return bookIds;
        } catch (e) {
            throw e;
        }
    },
    getOrderDetail: async function getOrderDetail(userId: number, orderId: number) {
        try {
            let result = await orderDb.selectOrderDetail(userId, orderId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}