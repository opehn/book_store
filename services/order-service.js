const { userDb } = require('../data/dbAccess');
const { orderDb } = require('../data/dbAccess');

module.exports = {
    handlePayment: async function handlePayment(email, items, delivery) {
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;

            let result = await orderDb.insertOrderAndDeleteCart(email, items, delivery);

            return (result);

        } catch (e) {

            throw (e);
        }
    }
}