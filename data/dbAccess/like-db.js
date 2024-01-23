const knex = require('../connection.js');
const logger = require('../../shared/logger/index.js');
const util = require('../dbUtil.js');

const likeTable = 'LIKES_TB';

module.exports = {
    insertLikedUser: async function insertLikedUser(userId, bookId) {
        try {
            const result = await knex(likeTable)
                .insert({
                    'user_id': userId,
                    'liked_book_id': bookId
                });
            return result;
        } catch (e) {
            logger.reportDbErr(likeTable, 'INSERT', e);
            throw e;
        }
    },
    deleteLikedUser: async function deleteLikedUser(userId) {
        try {
            const result = await knex(likeTable)
                .delete()
                .where({
                    user_id: userId,
                });
            return result;
        } catch (e) {
            logger.reportDbErr(likeTable, 'DELETE', e);
            throw e;
        }
    }
}
