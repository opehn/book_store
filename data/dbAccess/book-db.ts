import knex from '../connection.js';
import logger from '../../shared/logger/index.js';
import util from '../dbUtil.js';
import { Book } from '../../shared/type'

const bookTable: string = 'BOOKS_TB';

export default {
    getAllBooks: async function getAllBooks(limit: number, offset: number): Promise<Book[]> {
        try {
            const result = await knex('BOOKS_TB as bt')
                .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                .limit(limit).offset(offset);
            return result;
        } catch (e: any) {
            logger.reportDbErr(bookTable, 'SELECT', e.message);
            throw e;
        }
    },
    getBookById: async function getBookById(bookId: number): Promise<Book[]> {
        try {
            const result = await knex('BOOKS_TB as bt')
                .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                .where('bt.id', bookId);
            return result;
        } catch (e: any) {
            logger.reportDbErr(bookTable, 'SELECT', e.message);
            throw e;
        }
    },
    getBookByCategory: async function getBookByCategory(categoryId: number, isNew: boolean, limit: number, offset: number): Promise<Book[]> {
        try {
            let oneMonthAgo = util.getOneMonthAgo();
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
        } catch (e: any) {
            logger.reportDbErr(bookTable, 'SELECT', e.message);
            throw e;
        }
    }
}