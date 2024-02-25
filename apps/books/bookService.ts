import { BookRepository, getRepoInstance } from "./bookRepository";
import { BookDTO, BookDetailDTO } from "./types";

export class BookService {
    async toBookDTO(data: any): Promise<BookDTO[]> {
        const dto: BookDTO[] = data.map((cur: any) => {
            return {
                id: cur.id,
                title: cur.title,
                img: cur.img,
                categoryId: cur.category_id,
                form: cur.form,
                isbn: cur.isbn,
                summary: cur.summary,
                detail: cur.detail,
                author: cur.author,
                pages: cur.pages,
                contents: cur.contents,
                price: cur.price,
                likes: cur.likes,
                pubDate: cur.pub_date,
            }
        })
        return dto;
    }

    async toBookDetailDTO(data: any): Promise<BookDetailDTO[]> {
        const dto: BookDetailDTO[] = data.map((cur: any) => {
            return {
                id: cur.id,
                title: cur.title,
                img: cur.img,
                categoryId: cur.category_id,
                form: cur.form,
                isbn: cur.isbn,
                summary: cur.summary,
                detail: cur.detail,
                author: cur.author,
                pages: cur.pages,
                contents: cur.contents,
                price: cur.price,
                likes: cur.likes,
                pubDate: cur.pub_date,
                categoryName: cur.categoryName,
                liked: cur.liked
            }
        })
        return dto;
    }
}

export function getServiceInstance(): BookService {
    return new BookService();
}