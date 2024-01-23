const { userDb, likeDb } = require('../data/dbAccess');

module.exports = {
    toggleLikeStatus: async function toggleLikeStatus(email, bookId, liked) {
        try {
            let result;
            const userInfo = await userDb.getUserByEmail(email);
            const userId = userInfo[0].id;
            if (liked)
                result = await likeDb.deleteLikedUser(userId);
            else
                result = await likeDb.insertLikedUser(userId, bookId);
        } catch (e) {
            throw e;
        }
    }
}