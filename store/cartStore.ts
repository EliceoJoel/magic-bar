import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
}

interface CartProduct {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

interface State {
	products: Array<CartProduct>;
}

interface Actions {
	add: (product: Product) => void;
	remove: (product: Product) => void;
	clear: () => void;
	decreaseQuantity: (product: CartProduct) => void;
	increaseQuantity: (product: CartProduct) => void;
}

export const useCartStore = create(
	persist<State & Actions>(
		(set) => ({
			products: [],
			add: (product) =>
				set((state) => ({
					products: state.products.some((item) => item.id === product.id)
						? state.products
						: [...state.products, { ...product, quantity: 1 }],
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
			name: "cartStorage"
		}
	)
);
