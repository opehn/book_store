import { orderDb } from '../data/dbAccess';
import { Item } from '../shared/type'

export default {
    getOrderList: async function getOrderList(userId: number) {
        try {
            let result = await orderDb.selectOrderList(userId);
            return result;
        } catch (e) {
            throw e;

        }
    },
    handlePayment: async function handlePayment(userId: number, body: any) {
        try {
            let bookIds: number[] = body.items.map((cur: Item) => (cur.bookId));
            await orderDb.insertOrderAndDeleteCart(userId, body, bookIds);
            return;
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