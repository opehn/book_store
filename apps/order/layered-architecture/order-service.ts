import { BookItem, Order, OrderedBookItem, UserOrder, OrderDTO, OrderDetail, OrderDetailDTO } from '../types'
import { OrderRepository, getRepoInstance } from './order-db';
import { Logger } from 'winston';
import logger from '../../../shared/logger/index';
import knex from '../../../shared/data/connection';
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

    async getOrderList(userId: number): Promise<OrderDTO[]> {
        try {
            const data = await this.orderRepository.selectOrderByUserId(userId);
            const dto = await this.toOrderDTO(data);

            return dto;
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
                    'book_id': cur.book_id,
                    'quantity': cur.quantity,
                    'order_id': orderId[0]
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

    async getOrderDetail(userId: number, orderId: number): Promise<OrderDetailDTO[]> {
        try {
            const data = await this.orderRepository.selectOrderDetail(userId, orderId);
            const dto = this.toOrderDetailDTO(data);

            return dto;
        } catch (e) {
            throw e;
        }
    }
}

export function getServiceInstance() {
    return new OrderService(knex, logger, getRepoInstance());
}