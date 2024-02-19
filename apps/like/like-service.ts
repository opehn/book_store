import { likeDb } from '../../data/dbAccess';

export default {
    toggleLikeStatus: async function toggleLikeStatus(userId: number, bookId: number, liked: boolean) {
        try {
            if (liked)
                return await likeDb.deleteLikedUser(userId);
            else
                return await likeDb.insertLikedUser(userId, bookId);
        } catch (e) {
            throw e;
        }
    }
}