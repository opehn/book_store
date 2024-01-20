const knex = require('../connection.js');
const logger = require('../../shared/logger/index.js');

const categoryTable = 'CATEGORY_TB';

module.exports = {
    getAllCategory: async function getAllCategory() {
        try {
            const result = await knex(categoryTable).select('*');
            return result;
        } catch (e) {
            logger.reportDbErr(categoryTable, 'SELECT', e);
        }
    }
}