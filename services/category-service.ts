import { categoryDb } from '../data/dbAccess';

export default {
    getAllCategory: async function getAllCategory() {
        try {
            let result = await categoryDb.getAllCategory();
            return result;
        } catch (e) {
            throw e;
        }
    }
}