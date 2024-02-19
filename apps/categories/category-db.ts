import knex from '../../data/connection';
import logger from '../../shared/logger/index.js';

const categoryTable = 'CATEGORY_TB';

interface Category {
    id: number,
    name: string
}

export default {
    getAllCategory: async function getAllCategory(): Promise<Category[]> {
        try {
            return await knex(categoryTable).select('*');
        } catch (e: any) {
            logger.reportDbErr(categoryTable, 'SELECT', e.message);
            throw e;
        }
    }
}