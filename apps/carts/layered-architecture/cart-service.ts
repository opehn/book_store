import { CartRepository, getRepoInstance } from "./cart-db";
import { Cart } from "../../../shared/type";

export class CartService {
    private cartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async getCartList(userId: number): Promise<Cart[]> {
        try {
            const result: Cart[] = await this.cartRepository.selectCartByUser(userId);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async addCart(userId: number, bookId: number, count: number, sign: string) {
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

    async deleteCart(cartId: number) {
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