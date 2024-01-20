const knex = require('../connection.js');
const logger = require('../../shared/logger/index.js');
const util = require('../dbUtil.js');

const bookTable = 'BOOKS_TB';

module.exports = {
    getAllBooks: async function getAllBooks(limit, offset) {
        try {
            let result = await knex(bookTable).select('*').limit(limit).offset(offset);
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
    getBookByCategory: async function getBookByCategory(categoryId, isNew, limit, offset) {
        try {
            oneMonthAgo = util.getOneMonthAgo();
            let result;
            if (isNew) {
                result = await knex(bookTable).select()
                    .where({ category_id: categoryId })
                    .where('pub_date', '>', oneMonthAgo)
                    .limit(limit).offset(offset);
            } else {
                result = await knex(bookTable).select()
                    .where({ category_id: categoryId })
                limit(limit).offset(offset);
            }
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }
    }
}