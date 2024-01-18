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
    getOneBook: async function getOneBook(bookId) {
        try {
            let result = await bookDb.getBookById(bookId);
            return result;
        } catch (e) {
            throw e;
        }
    }
};