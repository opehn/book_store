import knex from '../../data/connection';
import logger from '../../shared/logger/index.js';

const likeTable = 'LIKES_TB';

export class LikeRepository {
    async insertLikedUser(userId: number, bookId: number) {
        try {
            const result = await knex(likeTable)
                .insert({
                    'user_id': userId,
                    'liked_book_id': bookId
                });
            return result;
        } catch (e: any) {
            logger.reportDbErr(likeTable, 'INSERT', e.message);
            throw e;
        }
    }

    async deleteLikedUser(userId: number) {
        try {
            const result = await knex(likeTable)
                .delete()
                .where({
                    user_id: userId,
                });
            return result;
        } catch (e: any) {
            logger.reportDbErr(likeTable, 'DELETE', e.message);
            throw e;
        }
    }
}

export function getRepoInstance() {
    return new LikeRepository();
}