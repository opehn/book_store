import knex from '../../../data/connection';
import logger from '../../../shared/logger/index.js';
import { UserOrder, Order } from '../types';
import { Knex } from 'knex';
import { Logger } from 'winston';
const orderTable = 'ORDERS_TB';
const orderBookTable = 'ORDERED_BOOKS_TB';
const deliveryTable = 'DELIVERY_TB';
const cartTable = 'CARTITEMS_TB';
import { OrderedBookItem } from '../types';


//TODO : delete if not required
type OrderRepositoryDeps = {
    knex: Knex;
    logger: Logger;
}

class OrderRepository {
    private knex: Knex;
    private logger: Logger;

    constructor(deps: OrderRepositoryDeps) {
        this.knex = knex;
        this.logger = logger;
    }



    async selectOrderByUserId(userId: number): Promise<UserOrder[]> {
        try {
            let orderList = await knex('ORDERS_TB as ot')
                .select(
                    'created_at', 'book_title', 'total_count', 'total_price',
                    'delivery_id', 'address', 'receiver', 'contact'
                ).where('ot.user_id', userId)
                .join('DELIVERY_TB as dt', 'dt.id', 'ot.delivery_id');
            return orderList;
        } catch (e: any) {
            logger.reportDbErr(orderTable, 'select', e.message);
            throw e;
        }
    }

    async insertOrder(userId: number, orderData: Order, deliveryId: number) {
        try {
            let orderId = await knex(orderTable)
                .insert({
                    user_id: userId,
                    delivery_id: deliveryId,
                    book_title: orderData.bookTitle,
                    total_price: orderData.totalPrice,
                    total_count: orderData.totalCount
                })
            return orderId;
        } catch (e: any) {
            logger.reportDbErr(orderTable, 'select', e.message);
            throw e;
        }
    }

    async intsertDelivery(userId: number, orderData: Order) {
        try {
            const deliveryId = await knex(deliveryTable)
                .insert({
                    receiver: orderData.delivery.receiver,
                    contact: orderData.delivery.contact,
                    address: orderData.delivery.address,
                    user_id: userId
                })
            return deliveryId;
        } catch (e: any) {
            logger.reportDbErr(orderTable, 'SELECT', e.message);
            throw e;
        }
    }

    async insertOrderedBook(items: OrderedBookItem[]) {
        try {
            return await knex(orderBookTable).insert(items);
        } catch (e: any) {
            logger.reportDbErr(orderBookTable, 'INSERT', e.message);
            throw e;
        }

    }


    async selectOrderDetail(userId: number, orderId: number) {
        let result = await knex('ORDERED_BOOKS_TB as ot')
            .select('ot.book_id', 'title', 'author', 'price', 'count')
            .where({ order_id: orderId })
            .join('BOOKS_TB as bt', 'id', 'ot.book_id')
        return result;
    }

    async deleteCart(userId: number, bookIds: number[]) {
        await knex(cartTable)
            .delete()
            .where({ user_id: userId })
            .whereIn('book_id', bookIds);
    }
}

function getRepoInstance(): OrderRepository {
    return new OrderRepository({ knex, logger });
}

export { OrderRepository, getRepoInstance };