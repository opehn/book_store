import { CartRepository } from "./cart-db";
import { Cart } from "../../../shared/type";

const cartTable = 'CARTITEMS_TB';

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
            console.log("addcart", result);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async deleteCart(cartId: number) {
        try {
            const result = await this.cartRepository.deleteCartItems(cartId);
            console.log("deleteCart", result);
            return result;
        } catch (e) {
            throw e;
        }
    }
}