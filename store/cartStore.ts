import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICartProduct } from "@/interfaces/objects";

interface State {
	products: Array<ICartProduct>;
}

interface Actions {
	add: (product: ICartProduct) => void;
	remove: (product: ICartProduct) => void;
	clear: () => void;
	decreaseQuantity: (product: ICartProduct) => void;
	increaseQuantity: (product: ICartProduct) => void;
}

export const useCartStore = create(
	persist<State & Actions>(
		(set) => ({
			products: [],
			add: (product) =>
				set((state) => ({
					products: state.products.some((item) => item.id === product.id)
						? state.products
						: [
								...state.products,
								{ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 },
						  ],
				})),
			remove: (product) => set((state) => ({ products: state.products.filter((item) => item.id !== product.id) })),
			clear: () => set(() => ({ products: [] })),
			decreaseQuantity: (product) =>
				set((state) => ({
					products: state.products.filter(function (item) {
						if (item.id === product.id && item.quantity > 1) {
							item.quantity -= 1;
						}
						return item;
					}),
				})),
			increaseQuantity: (product) =>
				set((state) => ({
					products: state.products.filter(function (item) {
						if (item.id === product.id) {
							item.quantity += 1;
						}
						return item;
					}),
				})),
		}),
		{
			name: "cartStorage",
		}
	)
);
