import knex from '../connection';
import logger from '../../shared/logger/index.js';

const categoryTable = 'CATEGORY_TB';

export default {
    getAllCategory: async function getAllCategory() {
        try {
            const result = await knex(categoryTable).select('*');
            return result;
        } catch (e) {
            logger.reportDbErr(categoryTable, 'SELECT', e);
        }
    }
}