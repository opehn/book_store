const { cartDb } = require('../data/dbAccess');
const { userDb } = require('../data/dbAccess');

module.exports = {
    getCartItems: async function getCartItems(email) {
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;
            let result = await cartDb.selectCartByUser(userId);
            return result;
        } catch (e) {
            throw e;
        }
    },
    addCartItems: async function addCartItems(email, bookId, count) {
        //email로 userId 조회
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;
            let result = await cartDb.insertCartItem(userId, bookId, count);
            return result;
        } catch (e) {
            throw e;
        }
    },
    deleteCartItems: async function deleteCartItems(email, bookId) {
        console.log('deleteCart service');
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;
            let result = await cartDb.deleteCartItems(userId, bookId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}