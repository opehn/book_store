import knex from '../../data/connection.js';
import logger from '../../shared/logger/index.js';
import util from '../../data/dbUtil.js';
import { Book } from '../../shared/type.js'
import { GetAllBookParams } from './books-controller.js';

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
    getBookByCategory: async function getBookByCategory(params: GetAllBookParams): Promise<Book[]> {
        try {
            let oneMonthAgo = util.getOneMonthAgo();
            let result;
            if (params.isNew) {
                result = await knex('BOOKS_TB as bt')
                    .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                    .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                    .where('bt.category_id', params.categoryId)
                    .where('pub_date', '>', oneMonthAgo)
                    .limit(params.limit).offset(params.offset);
            } else {
                result = await knex('BOOKS_TB as bt')
                    .select('bt.id', 'title', 'ct.name', 'form', 'isbn', 'summary', 'author', 'pages', 'contents', 'pub_date', 'detail', 'img')
                    .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                    .where({ category_id: params.categoryId })
                    .limit(params.limit).offset(params.offset);
            }
            return result;
        } catch (e: any) {
            logger.reportDbErr(bookTable, 'SELECT', e.message);
            throw e;
        }
    }
}