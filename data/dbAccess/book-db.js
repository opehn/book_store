const knex = require('../connection.js');
const logger = require('../../shared/logger/index.js');
const util = require('../dbUtil.js');

const bookTable = 'BOOKS_TB';

module.exports = {
    getAllBooks: async function getAllBooks(limit, offset) {
        try {
            const result = await knex('BOOKS_TB as bt')
                .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                .limit(limit).offset(offset);
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }
    },
    getBookById: async function getBookById(bookId) {
        try {
            const result = await knex('BOOKS_TB as bt')
                .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                .where('bt.id', bookId);
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
                result = await knex('BOOKS_TB as bt')
                    .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                    .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                    .where('bt.category_id', categoryId)
                    .where('pub_date', '>', oneMonthAgo)
                    .limit(limit).offset(offset);
            } else {
                result = await knex('BOOKS_TB as bt')
                    .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                    .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                    .where({ category_id: categoryId })
                    .limit(limit).offset(offset);
            }
            return result;
        } catch (e) {
            logger.reportDbErr(bookTable, 'SELECT', e);
        }
    }
}