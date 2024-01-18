const { bookDb } = require('../data/dbAccess');

module.exports = {
    getAllBooks: async function getAllBooks() {
        try {
            let result = await bookDb.getAllBooks();
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
    getBookByCategory: async function getBookByCategory(categoryId, isNew) {
        try {
            let result = await bookDb.getBookByCategory(categoryId, isNew);
            return result;
        } catch (e) {
            throw e;
        }
    },
};