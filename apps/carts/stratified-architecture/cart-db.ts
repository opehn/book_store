import knex from '../../../data/connection';
import logger from '../../../shared/logger/index.js';
import { Cart } from '../../../shared/type';
const cartTable = 'CARTITEMS_TB';

export class CartRepository {
    async selectCartByUser(userId: number): Promise<Cart[]> {
        try {
            let result = await knex('CARTITEMS_TB as ct')
                .select('ct.id', 'ct.book_id', 'bt.title', 'bt.summary',
                    'bt.img', 'bt.price', 'ct.count')
                .join('BOOKS_TB as bt', 'bt.id', '=', 'ct.book_id')
                .where({ 'ct.user_id': userId });
            return result;
        } catch (e: any) {
            logger.reportDbErr(cartTable, 'INSERT', e.message);
            throw e;
        }
    }

    async updateOrInsertCartItem(userId: number, bookId: number, count: number, sign: string) {
        try {
            let queryString: string;
            if (sign === 'plus')
                queryString =
                    'INSERT INTO CARTITEMS_TB (book_id, count, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE count = count + VALUES(count)'
            else
                queryString =
                    'INSERT INTO CARTITEMS_TB (book_id, count, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE count = CASE\
                WHEN count > 0 THEN count - VALUES(count)\
                ELSE count\
                END'

            let result = await knex.raw(
                queryString, [bookId, count, userId]
            );
            return result;
        } catch (e: any) {
            logger.reportDbErr(cartTable, 'INSERT', e.message);
            throw e;
        }
    }

    async deleteCart(userId: number, bookIds: number[]) {
        await knex(cartTable)
            .delete()
            .where({ user_id: userId })
            .whereIn('book_id', bookIds);
    }

    async deleteCartItems(cartId: number) {
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