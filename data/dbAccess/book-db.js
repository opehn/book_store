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
            console.log(bookId);
            let result = await knex(bookTable).select('*').where({ id: bookId });
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }
    },
}