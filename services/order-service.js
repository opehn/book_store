const { orderDb } = require('../data/dbAccess');

module.exports = {
    getOrderList: async function getOrderList(userId) {
        try {
            let result = await orderDb.selectOrderList(userId);
            console.log(result)
            return result;
        } catch (e) {
            throw (e);

        }
    },
    handlePayment: async function handlePayment(userId, body) {
        try {
            let bookIds = body.items.map(cur => (cur.bookId));
            await orderDb.insertOrderAndDeleteCart(userId, body, bookIds);
            return;
        } catch (e) {
            throw (e);
        }
    }
}