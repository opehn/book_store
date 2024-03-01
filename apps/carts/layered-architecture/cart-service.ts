import { CartRepository, getRepoInstance } from "./cart-db";
import { Cart, CartDTO } from "../types";


export class CartService {
    private cartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async toCartDTO(data: Cart[]): Promise<CartDTO[]> {
        const dto: CartDTO[] = data.map((cur: any) => {
            return {
                id: cur.id,
                bookId: cur.book_id,
                title: cur.title,
                summary: cur.summary,
                quantity: cur.quantity,
                price: cur.quantity
            }
        })
        return dto;
    }

    async getCartList(userId: number): Promise<CartDTO[]> {
        try {
            const data: Cart[] = await this.cartRepository.selectCartByUser(userId);
            const dto = this.toCartDTO(data);
            return dto;
        } catch (e) {
            throw e;
        }
    }

    async addCart(userId: number, bookId: number, count: number, sign: string): Promise<number> {
        try {
            const result = await this.cartRepository.updateOrInsertCartItem(userId, bookId, count, sign);
            if (result.affectedRows > 0)
                return 0;
            else
                return 1;
        } catch (e) {
            throw e;
        }
    }

    async deleteCart(cartId: number): Promise<number> {
        try {
            const result = await this.cartRepository.deleteCartItems(cartId);
            return result;
        } catch (e) {
            throw e;
        }
    }
}

export function getServiceInstance() {
    return new CartService(getRepoInstance());
}