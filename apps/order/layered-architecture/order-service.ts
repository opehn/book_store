import { BookItem, Order, OrderedBookItem } from '../types'
import { OrderRepository, getRepoInstance } from './order-db';
import { Logger } from 'winston';
import logger from '../../../shared/logger/index';
import knex from '../../../data/connection';
import { Knex } from 'knex';

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
            await this.knex.transaction(async trx => {
                const deliveryId = await this.orderRepository.intsertDelivery(userId, orderData);

                //insertOrder
                const orderId = await this.orderRepository.insertOrder(userId, orderData, deliveryId[0]);

                let newItems: OrderedBookItem[] = orderData.items.map((cur: any) => ({
                    'bookId': cur.bookId,
                    'quantity': cur.quantity,
                    'orderId': orderId[0]
                }));

                //insertOrderedBook
                await this.orderRepository.insertOrderedBook(newItems)

                //deleteCart
                await this.orderRepository.deleteCart(userId, bookIds);

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