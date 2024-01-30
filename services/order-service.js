const { userDb, orderDb, bookDb } = require('../data/dbAccess');

function getTotalCount(items) {
    let sum = 0;
    for (let cur of items) {
        sum += parseInt(cur.count);
    }
    return sum;
}

module.exports = {
    handlePayment: async function handlePayment(userId, items, delivery) {
        try {
            let bookInfo = await bookDb.getBookById(items[0].bookId);
            let bookTitle = bookInfo[0].title;
            let bookIds = items.map(cur => (cur.bookId));

            let totalCount = getTotalCount(items);
            await orderDb.insertOrderAndDeleteCart(userId, items, delivery, bookTitle, totalCount, bookIds);
            return;

        } catch (e) {
            throw (e);
        }
    }
}