import { bookDb } from '../data/dbAccess/index';

export default {
    getAllBooks: async function getAllBooks(limit: number, offset: number) {
        try {
            let result = await bookDb.getAllBooks(limit, offset);
            return result;
        } catch (e) {
            throw e;
        }
    },
    getBookDetail: async function getBookDetail(bookId: number) {
        try {
            let result = await bookDb.getBookById(bookId);
            return result;
        } catch (e) {
            throw e;
        }
    },
    getBookByCategory: async function getBookByCategory(categoryId: number, isNew: boolean, limit: number, offset: number) {
        try {
            let result = await bookDb.getBookByCategory(categoryId, isNew, limit, offset);
            return result;
        } catch (e) {
            throw e;
        }
    },
};