import { BookService } from "../bookService";
import { BookDTO, BookDetailDTO } from '../types'

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService();
    })

    it('should convert data to BookDTO', async () => {
        const inputData = [
            {
                id: 1,
                title: 'Book Title',
                img: 'image.jpg',
                category_id: 101,
                form: 'Hardcover',
                isbn: '1234567890',
                summary: 'Summary of the book',
                detail: 'Detailed description of the book',
                author: 'Author Name',
                pages: 200,
                contents: 'Contents of the book',
                price: 19.99,
                likes: 100,
                pub_date: '2023-01-01',
            }
        ]

        const expectedOutput: BookDTO[] = [
            {
                id: 1,
                title: 'Book Title',
                img: 1,
                categoryId: 101,
                form: 'Hardcover',
                isbn: '1234567890',
                summary: 'Summary of the book',
                detail: 'Detailed description of the book',
                author: 'Author Name',
                pages: 200,
                contents: 'Contents of the book',
                price: 19.99,
                likes: 100,
                pubDate: '2024-01-01',
            }
        ]
        const result = await bookService.toBookDTO(inputData);
        expect(result).toEqual(expectedOutput);
    })


})





