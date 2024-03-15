import knex from '../../../shared/data/connection';
import logger from '../../../shared/logger/index.js';
import { Cart } from '../types';
const cartTable = 'CARTITEMS_TB';

export class CartRepository {
    async selectCartByUser(userId: number): Promise<Cart[]> {
        try {
            let result = await knex('CARTITEMS_TB as ct')
                .select('ct.id', 'ct.book_id', 'bt.title', 'bt.summary',
                    'bt.img', 'bt.price', 'ct.quantity')
                .join('BOOKS_TB as bt', 'bt.id', '=', 'ct.book_id')
                .where({ 'ct.user_id': userId });
            return result;
        } catch (e: any) {
            logger.reportDbErr(cartTable, 'INSERT', e.message);
            throw e;
        }
    }

    async updateOrInsertCartItem(userId: number, bookId: number, quantity: number, sign: string): Promise<any> {
        try {
            let queryString: string;
            if (sign === 'plus')
                queryString =
                    'INSERT INTO CARTITEMS_TB (book_id, quantity, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)'
            else
                queryString =
                    'INSERT INTO CARTITEMS_TB (book_id, quantity, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE quantity = CASE\
                WHEN quantity > 0 THEN quantity - VALUES(quantity)\
                ELSE quantity\
                END'

            let result = await knex.raw(
                queryString, [bookId, quantity, userId]
            );
            return result;
        } catch (e: any) {
            logger.reportDbErr(cartTable, 'INSERT', e.message);
            throw e;
        }
    }

    async deleteCartItems(cartId: number): Promise<number> {
        try {
            let result = await knex(cartTable).delete()
                .where({ 'id': cartId })
            return result;

        } catch (e: any) {
            logger.reportDbErr(cartTable, 'INSERT', e.message);
            throw e;
        }
    }
}

export function getRepoInstance() {
    return new CartRepository();
}