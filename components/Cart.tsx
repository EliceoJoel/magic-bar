import Image from "next/image";

import { IoCloseOutline } from "react-icons/io5";
import { HiMinus, HiPlus, HiX } from "react-icons/hi";
import { FiTrash } from "react-icons/fi";

import { useCartStore } from "@/store/cartStore";
import { calculateProductsToTalPrice } from "@/utils/all";

function Cart() {
	const { products, decreaseQuantity, increaseQuantity, clear, remove } = useCartStore((state) => state);

	return (
		<div className="menu p-4 w-60 ssm:w-80 bg-base-200 md:w-96">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl">Order items</h2>
				<label htmlFor="theDrawer" className="btn btn-outline btn-circle">
					<IoCloseOutline className="h-6 w-6" />
				</label>
			</div>
			{products.map((product, index) => (
				<div className="bg-white rounded-btn mb-2 shadow-lg px-3 py-4 flex" key={index}>
					<Image alt="order 1" src={product.image} className="w-20 h-20 mr-2" width={1000} height={1000} />
					<div className="flex flex-col justify-between w-full gap-1">
						<p>{product.name}</p>
						<span className="font-semibold">{product.price * product.quantity} Bs.</span>
						<div className="flex justify-between">
							<div>
								<button
									className="btn btn-sm btn-circle btn-outline "
									onClick={() => decreaseQuantity(product)}
								>
									<HiMinus />
								</button>
								<span className="p-2">{product.quantity}</span>
								<button
									className="btn btn-sm btn-circle btn-outline "
									onClick={() => increaseQuantity(product)}
								>
									<HiPlus />
								</button>
							</div>
							<div>
								<button
									className="btn btn-sm btn-circle btn-outline hover:bg-red-500 hover:border-red-500"
									onClick={() => remove(product)}
								>
									<HiX />
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
			{products.length > 0 ? (
				<>
					<div className="my-2 flex justify-between">
						<button className="btn btn-circle btn-outline hover:bg-red-500 hover:border-red-500" onClick={clear}>
							<FiTrash className="w-6 h-6" />
						</button>
						<label htmlFor="orderModal" className="btn btn-primary flex justify-between w-56 normal-case md:w-72">
							<span>Make order</span>
							<span>{calculateProductsToTalPrice(products)} Bs.</span>
						</label>
					</div>
				</>
			) : (
				<div className="my-2">
					<p className="text-center">No products added to your orden</p>
				</div>
			)}
		</div>
	);
}

export default Cart;
