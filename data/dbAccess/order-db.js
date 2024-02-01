const knex = require('../connection');
const logger = require('../../shared/logger/index.js');
const orderTable = 'ORDERS_TB';
const orderBookTable = 'ORDERED_BOOKS_TB';
const deliveryTable = 'DELIVERY_TB';
const cartItemsTable = 'CARTITEMS_TB';

module.exports = {
    selectOrderList: async function selectOrderList(userId) {
        try {
            let orderList = await knex('ORDERS_TB as ot')
                .select(
                    'created_at', 'book_title', 'total_count', 'total_price', 'delivery_id',
                    'dt.id', 'address', 'receiver', 'contact'
                ).where('ot.user_id', userId)
                .join('DELIVERY_TB as dt', 'dt.id', 'ot.delivery_id');
            return orderList;
        } catch (e) {
            logger.reportDbErr(orderTable, 'select', e);
        }
    },
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
    },
    selectOrderDetail: async function selectOrderDetail(userId, orderId) {
        let result = await knex('ORDERED_BOOKS_TB as ot')
            .select('ot.book_id', 'title', 'author', 'price', 'count')
            .where({ order_id: orderId })
            .join('BOOKS_TB as bt', 'id', 'ot.book_id')
        return result;
    }
}