const { cartDb } = require('../data/dbAccess');
const { userDb } = require('../data/dbAccess');

module.exports = {
    getCartItems: async function getCartItems(userId) {
        try {
            let result = await cartDb.selectCartByUser(userId);
            return result;
        } catch (e) {
            throw e;
        }
    },
    updateCartItems: async function updateCartItems(userId, bookId, count, sign) {
        //email로 userId 조회
        try {
            let result = await cartDb.updateOrInsertCartItem(userId, bookId, count, sign);
            return result;
        } catch (e) {
            throw e;
        }
    },
    deleteCartItems: async function deleteCartItems(userId, bookId) {
        console.log('deleteCart service');
        try {
            let result = await cartDb.deleteCartItems(userId, bookId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}