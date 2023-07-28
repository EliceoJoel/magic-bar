import { ICartProduct } from "@/interfaces/objects";

export function calculateProductsToTalPrice(products: Array<ICartProduct>) {
	return products.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
}
