import knex from '../../../shared/data/connection';
import logger from '../../../shared/logger/index.js';
import { Category } from '../types';

const categoryTable = 'CATEGORY_TB';

export class CategoryRepository {

    async selectCategoryAll(): Promise<Category[]> {
        try {
            return await knex(categoryTable).select('*');
        } catch (e: any) {
            logger.reportDbErr(categoryTable, 'SELECT', e.message);
            throw e;
        }
    }
}

export function getRepoInstance() {
    return new CategoryRepository();
}