import knex from '../../data/connection.js';
import logger from '../../shared/logger/index.js';
import dbUtil from '../../data/dbUtil.js';
import { GetBookParams } from './types.js';
import { Knex } from 'knex';
import { Logger } from 'winston';

const bookTable: string = 'BOOKS_TB';

type BookRepositoryDeps = {
    knex: Knex;
    logger: Logger;
}


class BookRepository {
    private knex: Knex;
    private logger: Logger;

    constructor(deps: BookRepositoryDeps) {
        this.knex = knex;
        this.logger = logger;
    }

    async selectAllBooks(limit: number, offset: number): Promise<any> {
        try {
            const result = await knex('BOOKS_TB as bt')
                .select('bt.id', 'title', 'img', 'ct.id', 'form', 'isbn', 'summary', 'detail', 'author', 'pages',
                    'contents', 'price', 'likes', 'pub_date')
                .join('CATEGORY_TB as ct', 'bt.category_id', '=', 'ct.id')
                .limit(limit).offset(offset);
            return result;
        } catch (e: any) {
            logger.reportDbErr(bookTable, 'SELECT', e.message);
            throw e;
        }
    }

    async selectBookById(bookId: number, userId: number): Promise<any> {
        try {
            const result = await knex('BOOKS_TB as bt')
                .select('bt.*', 'ct.name AS category_name')
                .count('lt.liked_book_id as likes')
                .leftJoin('LIKES_TB as lt', function () {
                    this.on('bt.id', 'lt.liked_book_id').andOn('lt.user_id', '=', knex.raw('?', [userId]));
                })
                .join('CATEGORY_TB as ct', 'bt.category_id', 'ct.id')
                .where('bt.id', bookId)
                .groupBy('bt.id', 'ct.id');
            return result;
        } catch (e: any) {
            logger.reportDbErr(bookTable, 'SELECT', e.message);
            throw e;
        }
    }

    async selectBookByCategory(params: GetBookParams): Promise<any> {
        try {
            let oneMonthAgo = dbUtil.getOneMonthAgo();
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

function getRepoInstance(): BookRepository {
    return new BookRepository({ knex, logger });
}

export { BookRepository, getRepoInstance };