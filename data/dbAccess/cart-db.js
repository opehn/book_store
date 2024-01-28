const knex = require('../connection');
const logger = require('../../shared/logger/index.js');
const cartTable = 'CARTITEMS_TB';

module.exports = {
    selectCartByUser: async function selectCartByUser(userId) {
        try {
            let result = await knex('CARTITEMS_TB as ct')
                .select('ct.id', 'ct.book_id', 'bt.title', 'bt.summary',
                    'bt.img', 'bt.price', 'ct.count')
                .join('BOOKS_TB as bt', 'bt.id', '=', 'ct.book_id')
                .where({ 'ct.user_id': userId });
            return result;
        } catch (e) {
            logger.reportDbErr(cartTable, 'INSERT', e);
            throw e;
        }
    },
    updateOrInsertCartItem: async function updateOrInsertCartItem(userId, bookId, count, sign) {
        try {
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
            return result[0];
        } catch (e) {
            logger.reportDbErr(cartTable, 'INSERT', e);
            throw e;
        }
    },
    deleteCartItems: async function deleteCartItems(userId, bookId) {
        console.log('delete cart db')
        try {
            let result = await knex(cartTable).delete()
                .where({ 'user_id': userId })
                .andWhere({ 'book_id': bookId });
            console.log(result);
            return result;

        } catch (e) {
            logger.reportDbErr(cartTable, 'INSERT', e);
            throw e;
        }
    }
}