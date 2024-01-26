const knex = require('../connection');
const logger = require('../../shared/logger/index.js');
const cartTable = 'CARTITEMS_TB';

module.exports = {
    selectCartByUser: async function selectCartByUser(userId) {
        try {
            let result = await knex(cartTable).select('book_id', 'count').where({ user_id: userId });
            return result;
        } catch (e) {
            logger.reportDbErr(cartTable, 'INSERT', e);
            throw e;
        }
    },
    insertCartItem: async function insertCartItem(userId, bookId, count) {
        try {
            let result = await knex.raw(
                'INSERT INTO CARTITEMS_TB (book_id, count, user_id)\
                VALUES (?, ?, ?)\
                ON DUPLICATE KEY UPDATE count = count + VALUES(count)'
                , [bookId, count, userId]
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