import knex from '../connection';
import logger from '../../shared/logger/index.js';
import util from '../dbUtil.js';

const likeTable = 'LIKES_TB';

export default {
    insertLikedUser: async function insertLikedUser(userId: number, bookId: number) {
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
    deleteLikedUser: async function deleteLikedUser(userId: number) {
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
