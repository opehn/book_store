const { cartDb } = require('../data/dbAccess');
const { userDb } = require('../data/dbAccess');

module.exports = {
    addCartItems: async function addCartItems(email, bookId, count) {
        //email로 userId 조회
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;
            let result = cartDb.insertCartItem(userId, bookId, count);
            return result;
        } catch (e) {
            throw e;
        }
    },
    getCartItems: async function getCartItems(email) {
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;
            let result = await cartDb.selectCartByUser(userId);
            console.log(result);
            return result;
        } catch (e) {
            throw e;
        }
    }
}