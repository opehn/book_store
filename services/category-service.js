const { categoryDb } = require('../data/dbAccess');

module.exports = {
    getAllCategory: async function getAllCategory() {
        try {
            let result = await categoryDb.getAllCategory();
            return result;
        } catch (e) {
            throw e;
        }
    }
}