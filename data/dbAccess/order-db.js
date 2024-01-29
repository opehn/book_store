const knex = require('../connection');
const logger = require('../../shared/logger/index.js');
const orderTable = 'ORDERS_TB';
const orderBookTable = 'ORDERED_BOOKS_TB';
const deliveryTable = 'DELEIVERY_TB';

module.exports = {
    insertOrderAndDeleteCart: async function insertOrderAndDeleteCart(userId, items, delivery) {
        //결제 테이블에 추가
        //성공 시 userId, bookID가 일치하는 장바구니 목록 삭제
    }
}