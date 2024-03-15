import { BookItem, Order, OrderedBookItem, UserOrder, OrderDTO, OrderDetail, OrderDetailDTO } from '../types'
import { OrderRepository, getRepoInstance } from './order-db.str';
import { Logger } from 'winston';
import logger from '../../../shared/logger/index';
import knex from '../../../data/connection';
import { Knex } from 'knex';
import { order } from '../../../routes';

export class OrderService {
    private logger: Logger;
    private knex: Knex;

    constructor(knex: Knex, logger: Logger, orderRepository: OrderRepository,) {
        this.knex = knex;
        this.logger = logger;
    }

    async toOrderDTO(data: UserOrder[]): Promise<OrderDTO[]> {
        const dto: OrderDTO[] = data.map((cur) => {
            return {
                id: cur.id,
                createdAt: cur.created_at,
                address: cur.address,
                receiver: cur.receiver,
                contact: cur.contact,
                bookTitle: cur.book_title,
                totalQuantity: cur.total_quantity,
                totalPrice: cur.total_price
            }
        })
        return dto;
    }

    async toOrderDetailDTO(data: OrderDetail[]): Promise<OrderDetailDTO[]> {
        const dto: OrderDetailDTO[] = data.map((cur) => {
            return {
                id: cur.book_id,
                title: cur.title,
                author: cur.author,
                price: cur.price,
                quantity: cur.quantity,
            }
        })
        return dto;
    }


    makeBookIds(orderData: Order): number[] {
        try {
            let bookIds: number[] = orderData.items.map((cur: BookItem) => (parseInt(cur.bookId)));
            return bookIds;
        } catch (e) {
            throw e;
        }
    }
}

export function getServiceInstance() {
    return new OrderService(knex, logger, getRepoInstance());
}