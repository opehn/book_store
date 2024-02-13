import { userDb, likeDb } from '../data/dbAccess';

export default {
    toggleLikeStatus: async function toggleLikeStatus(userId: number, bookId: number, liked: boolean) {
        try {
            let result;
            if (liked)
                result = await likeDb.deleteLikedUser(userId);
            else
                result = await likeDb.insertLikedUser(userId, bookId);
        } catch (e) {
            throw e;
        }
    }
}