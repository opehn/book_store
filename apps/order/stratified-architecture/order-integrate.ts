import { OrderRepository, getRepoInstance } from './order-db.str';
import { OrderService, getServiceInstance } from './order-service.str';
import cartDb from '../../carts/cart-db'
import logger from '../../../shared/logger/index';
import knex from '../../../data/connection';
import { Order } from '../../../shared/type'

const orderService = getServiceInstance();
const orderRepository = getRepoInstance();

export default {

    getOrderList: async function getOrderList(userId: number) {
        try {
            let result = await orderRepository.selectOrderByUserId(userId);
            return result;
        } catch (e) {
            throw e;
        }
    },

    handlePayment: async function handlePayment(userId: number, orderData: Order): Promise<void> {
        try {
            const bookIds = orderService.makeBookIds(orderData);
            await knex.transaction(async trx => {
                const deliveryId = await orderRepository.intsertDelivery(userId, orderData);

                //insertOrder
                const orderId = await orderRepository.insertOrder(userId, orderData, deliveryId[0]);

                let newItems = orderService.makeBookItems(orderData, orderId[0]);

                //insertOrderedBook
                let result = await orderRepository.insertOrderedBook(newItems)

                //deleteCart
                let result2 = await cartDb.deleteCartByUserIdAndBookId(userId, bookIds);

                trx.commit;
            })
        } catch (e: any) {
            logger.reportDbErr('Mutiple Table', 'Transaction', e.message);
            throw e;
        }
    },

    getOrderDetail: async function getOrderDetail(userId: number, orderId: number) {
        try {
            let result = await orderRepository.selectOrderDetail(userId, orderId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}