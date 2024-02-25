import { BookService, getServiceInstance } from './bookService';
import { BookRepository, getRepoInstance } from './bookRepository';
import { BookDTO, BookDetailDTO, GetBookParams } from './types';

export class BookIntegration {
    private BookRepository = getRepoInstance();
    private BookService = getServiceInstance();

    constructor(BookRepository: BookRepository, BookService: BookService) {
        this.BookRepository = BookRepository;
        this.BookService = BookService;
    }

    async getBookNoCategory(limit: number, offset: number): Promise<BookDTO[]> {
        try {
            const data = await this.BookRepository.selectAllBooks(limit, offset);
            const dto: BookDTO[] = await this.BookService.toBookDTO(data);

            return dto;
        } catch (e) {
            throw (e);
        }
    }

    async getBookByCategory(params: GetBookParams): Promise<BookDTO[]> {
        try {
            const data = await this.BookRepository.selectBookByCategory(params);
            const dto: BookDTO[] = await this.BookService.toBookDTO(data);
            return dto;
        } catch (e) {
            throw (e);
        }
    }

    async getBookDetail(bookId: number): Promise<BookDetailDTO[]> {
        try {
            const data = await this.BookRepository.selectBookById(bookId);
            const dto: BookDetailDTO[] = await this.BookRepository.selectBookById(bookId);
            return dto;
        } catch (e) {
            throw (e);
        }
    }
}

export function getBookInstance() {
    return new BookIntegration(getRepoInstance(), getServiceInstance());
}
