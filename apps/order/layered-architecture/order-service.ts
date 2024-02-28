import { BookItem, Order } from '../../../shared/type'
import { OrderRepository, getRepoInstance } from './order-db';
import cartDb from '../../carts/cart-db'
import { Logger } from 'winston';
import logger from '../../../shared/logger/index';
import knex from '../../../data/connection';
import { Knex } from 'knex';
import { OrderedBookItem } from '../type';
import { order } from '../../../routes';

export class OrderService {
    private orderRepository: OrderRepository;
    private logger: Logger;
    private knex: Knex;

    constructor(knex: Knex, logger: Logger, orderRepository: OrderRepository,) {
        this.knex = knex;
        this.logger = logger;
        this.orderRepository = orderRepository;
    }

    async getOrderList(userId: number) {
        try {
            let result = await this.orderRepository.selectOrderByUserId(userId);
            return result;
        } catch (e) {
            throw e;
        }
    }

    makeBookIds(orderData: Order): number[] {
        try {
            let bookIds: number[] = orderData.items.map((cur: BookItem) => (parseInt(cur.bookId)));
            return bookIds;
        } catch (e) {
            throw e;
        }
    }

    async handlePayment(userId: number, orderData: Order): Promise<void> {
        try {
            const bookIds = this.makeBookIds(orderData);
            await knex.transaction(async trx => {
                const deliveryId = await this.orderRepository.intsertDelivery(userId, orderData);
                console.log(deliveryId);

                //insertOrder
                const orderId = await this.orderRepository.insertOrder(userId, orderData, deliveryId[0]);

                let newItems: OrderedBookItem[] = orderData.items.map((cur: any) => ({
                    'book_id': cur.bookId,
                    'count': cur.count,
                    'order_id': orderId[0]
                }));

                //insertOrderedBook
                let result = await this.orderRepository.insertOrderedBook(newItems)

                //deleteCart
                let result2 = await cartDb.deleteCartByUserIdAndBookId(userId, bookIds);

                trx.commit;
            })
        } catch (e: any) {
            this.logger.reportDbErr('Mutiple Table', 'Transaction', e.message);
            throw e;
        }
    }

    async getOrderDetail(userId: number, orderId: number) {
        try {
            let result = await this.orderRepository.selectOrderDetail(userId, orderId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}

export function getServiceInstance() {
    return new OrderService(knex, logger, getRepoInstance());
}