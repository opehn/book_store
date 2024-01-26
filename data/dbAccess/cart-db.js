const knex = require('../connection');
const logger = require('../../shared/logger/index.js');
const cartTable = 'CARTITEMS_TB';

module.exports = {
    insertCartItem: async function insertCartItem(userId, bookId, count) {
        try {
            let result = await knex(cartTable).insert({
                book_id: bookId,
                count: count,
                user_id: userId
            });
            console.log(result);
            return result;
        } catch (e) {
            logger.reportDbErr(cartTable, 'INSERT', e);
            throw e;
        }
    },
    selectCartByUser: async function selectCartByUser(userId) {
        try {
            let result = await knex(cartTable).select('book_id', 'count').where({ user_id: userId });
            console.log(result);
            return result;
        } catch (e) {
            logger.reportDbErr(cartTable, 'INSERT', e);
            throw e;
        }
    }
}