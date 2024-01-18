const knex = require('../connection.js');
const logger = require('../../shared/logger/index.js');
const util = require('../dbUtil.js');

const bookTable = 'BOOKS_TB';

module.exports = {
    getAllBooks: async function getAllBooks() {
        try {
            let result = await knex(bookTable).select('*');
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }
    },
    getBookById: async function getBookById(bookId) {
        try {
            let result = await knex(bookTable).select('*').where({ id: bookId });
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }
    },
    getBookByCategory: async function getBookByCategory(categoryId, isNew) {
        try {
            //TODO : 한달 전 날짜 찾기
            //const oneMonthAgo = await knex.raw('date_sub(?, INTERVAL ? MONTH)', [knex.fn.now(), 1]);
            let result;
            if (isNew) {
                result = await knex(bookTable).select()
                    .where({ category_id: categoryId })
                    .where('pub_date', '>', '2023-12-01T00:00:00.000Z');

                console.log(result)
            } else {
                result = await knex(bookTable).select()
                    .where({ category_id: categoryId });
                console.log(result)
            }
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }

    }
}
