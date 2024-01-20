const { bookDb } = require('../data/dbAccess');

module.exports = {
    getAllBooks: async function getAllBooks(limit, offset) {
        try {
            let result = await bookDb.getAllBooks(limit, offset);
            return result;
        } catch (e) {
            throw e;
        }
    },
    getBookDetail: async function getBookDetail(bookId) {
        try {
            let result = await bookDb.getBookById(bookId);
            return result;
        } catch (e) {
            throw e;
        }
    },
    getBookByCategory: async function getBookByCategory(categoryId, isNew, limit, offset) {
        try {
            let result = await bookDb.getBookByCategory(categoryId, isNew, limit, offset);
            return result;
        } catch (e) {
            throw e;
        }
    },
};