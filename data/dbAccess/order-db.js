const knex = require('../connection');
const logger = require('../../shared/logger/index.js');
const orderTable = 'ORDERS_TB';
const orderBookTable = 'ORDERED_BOOKS_TB';
const deliveryTable = 'DELIVERY_TB';
const cartItemsTable = 'CARTITEMS_TB';

module.exports = {
    insertOrderAndDeleteCart: async function insertOrderAndDeleteCart(userId, body, bookIds) {
        try {
            await knex.transaction(async trx => {
                const deliveryId = await trx(deliveryTable)
                    .insert({
                        receiver: body.delivery.receiver,
                        contact: body.delivery.contact,
                        address: body.delivery.address,
                        user_id: userId
                    })

                const orderId = await trx(orderTable)
                    .insert({
                        user_id: userId,
                        delivery_id: deliveryId[0],
                        book_title: bookTitle,
                        total_price: body.totalPrice,
                        total_count: body.totalCount
                    })

                let newItems = body.items.map(cur => ({
                    'book_id': cur.bookId,
                    'count': cur.count,
                    'order_id': orderId
                }));

                await trx(orderBookTable)
                    .insert(newItems);

                await trx(cartItemsTable)
                    .delete()
                    .where({ user_id: userId })
                    .whereIn('book_id', bookIds);
                trx.commit;
            })
        } catch (e) {
            logger.reportDbErr('Mutiple Table', 'Transaction', e);
            throw e;
        }
    }
}