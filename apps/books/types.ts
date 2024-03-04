export interface GetBookParams {
    categoryId?: number,
    limit: number,
    offset: number,
    isNew?: boolean
}

export interface BookDTO {
    id: number;
    title: string;
    img: number;
    categoryId: number;
    form: string;
    isbn: string;
    summary: string;
    detail: string;
    author: string;
    pages: number;
    contents: string;
    price: number;
    likes: number;
    pubDate: Date;
}

export interface BookDetailDTO extends BookDTO {
    categoryName: string;
    liked: boolean;
}
