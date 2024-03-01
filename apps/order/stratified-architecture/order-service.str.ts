import { BookItem, Order } from '../types'
import { OrderRepository, getRepoInstance } from './order-db.str';
import { Logger } from 'winston';
import logger from '../../../shared/logger/index';
import knex from '../../../data/connection';
import { Knex } from 'knex';
import { OrderedBookItem } from '../types';
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

    makeBookIds(orderData: Order): number[] {
        try {
            let bookIds: number[] = orderData.items.map((cur: BookItem) => (parseInt(cur.bookId)));
            return bookIds;
        } catch (e) {
            throw e;
        }
    }

    makeBookItems(orderData: Order, orderId: number): OrderedBookItem[] {
        let newItems: OrderedBookItem[] = orderData.items.map((cur: any) => ({
            'bookId': cur.bookId,
            'quantity': cur.count,
            'orderId': orderId
        }));
        return newItems;

    }
}

export function getServiceInstance() {
    return new OrderService(knex, logger, getRepoInstance());
}