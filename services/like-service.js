const { userDb, likeDb } = require('../data/dbAccess');

module.exports = {
    toggleLikeStatus: async function toggleLikeStatus(userId, bookId, liked) {
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