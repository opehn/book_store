const { userDb } = require('../data/dbAccess');

module.exports = {
    handlePayment: async function handlePayment(email, items, delivery) {
        try {
            let userInfo = await userDb.getUserByEmail(email);
            let userId = userInfo[0].id;
            console.log('serveice')
            console.log(userId);
            return (userId);
            //결제 테이블에 추가 + userId, bookId가 일치하는 장바구니 목록 삭제

        } catch (e) {

            throw (e);
        }
    }
}