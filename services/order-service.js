const { orderDb } = require('../data/dbAccess');

module.exports = {
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