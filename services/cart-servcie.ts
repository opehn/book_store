const { cartDb } = require('../data/dbAccess');
const { userDb } = require('../data/dbAccess');

export default {
    getCartItems: async function getCartItems(userId: number) {
        try {
            let result = await cartDb.selectCartByUser(userId);
            return result;
        } catch (e) {
            throw e;
        }
    },
    updateCartItems: async function updateCartItems(userId: number, bookId: number, count: number, sign: string) {
        //email로 userId 조회
        try {
            let result = await cartDb.updateOrInsertCartItem(userId, bookId, count, sign);
            return result;
        } catch (e) {
            throw e;
        }
    },
    deleteCartItems: async function deleteCartItems(userId: number, bookId: number) {
        try {
            let result = await cartDb.deleteCartItems(userId, bookId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}