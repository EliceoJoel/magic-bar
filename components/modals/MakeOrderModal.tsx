import { useState } from "react";
import { useForm } from "react-hook-form";

import { INewOrderInputs } from "@/interfaces/forms";
import { getYupSchema, newOrderSchema } from "@/yup/schemas";
import { createNewOrder } from "@/firebase/orders";
import { OrderStatus } from "@/constants/enums";
import { useCartStore } from "@/store/cartStore";
import { calculateProductsToTalPrice } from "@/utils/all";
import { ICartProduct } from "@/interfaces/objects";

function MakeOrderModal() {
	const [isSavingOrder, setIsSavingOrder] = useState(false);

	const { products: cartProducts, clear: clearCart } = useCartStore((state) => state);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<INewOrderInputs>(getYupSchema(newOrderSchema));

	const handleNewOrder = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingOrder(true);

		// Create new order in firebase
		await createNewOrder({
			...data,
			totalprice: calculateProductsToTalPrice(cartProducts),
			status: OrderStatus.PENDING,
			createdAt: new Date(),
			products: cartProducts,
		});

		// Clear cart
		clearCart();

		// Close modal and reset inputs
		document.getElementById("makeOrderModal")?.click();
		reset();

		// Close cart right side drawer
		document.getElementById("theDrawer")?.click();

		//Set loading as finished
		setIsSavingOrder(false);

		// Show a success alert message
	});

	return (
		<>
			<input type="checkbox" id="makeOrderModal" className="modal-toggle" />
			<div className="modal">
				<form className="modal-box relative max-w-md" onSubmit={handleNewOrder}>
					<label
						htmlFor="makeOrderModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => reset()}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">New Order</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol <span className="text-red-500">[*]</span> need to be filled because
								they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label htmlFor="orderTableNumberInput" className="label justify-start">
								<span className="label-text">Table Number</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="orderTableNumberInput"
								type="number"
								placeholder="Type table number for the order"
								className="input input-bordered input-primary w-full"
								{...register("tableNumber")}
							/>
							{errors.tableNumber && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.tableNumber.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="orderDatailsInput" className="label">
								<span className="label-text">Details</span>
							</label>
							<textarea
								autoComplete="off"
								id="orderDatailsInput"
								placeholder="Type client order details"
								className="textarea textarea-primary text-base"
								{...register("details")}
							/>
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="makeOrderModal" className="btn capitalize" onClick={() => reset()}>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isSavingOrder && "loading"}`}>
							{isSavingOrder ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default MakeOrderModal;
