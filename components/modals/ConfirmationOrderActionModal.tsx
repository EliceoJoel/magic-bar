import { useState } from "react";

import { getAllOrders, updateOrderStatus } from "@/firebase/orders";

import { OrderStatus } from "@/constants/enums";
import { IConfirmationOrderActionModalProps } from "@/interfaces/props";

function ConfirmationOrderActionModal({
	message,
	actionType,
	orderId,
	updateOrders,
}: IConfirmationOrderActionModalProps) {
	const [isConfirming, setIsConfirming] = useState(false);

	const handleConfirmAction = async () => {
		// Set loading as started
		setIsConfirming(true);

		// update order status in firebase
		if (actionType === OrderStatus.CANCELED) {
			await updateOrderStatus(orderId, OrderStatus.CANCELED);
		} else if (actionType === OrderStatus.COMPLETE) {
			await updateOrderStatus(orderId, OrderStatus.COMPLETE);
		}

		//get all orders updated and show them
		const ordersUpdated = await getAllOrders();
		updateOrders(ordersUpdated);

		// Close modal and reset inputs
		document.getElementById("confirmationOrderActionModal")?.click();

		//Set loading as finished
		setIsConfirming(false);

		// Show a success alert message
	};

	return (
		<>
			<input type="checkbox" id="confirmationOrderActionModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-md">
					<label htmlFor="confirmationOrderActionModal" className="btn btn-sm btn-circle absolute right-2 top-2" tabIndex={0}>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">Confirmation</h3>
					<div className="flex flex-col gap-2">
						<p>{message}</p>
					</div>
					<div className="modal-action">
						<button
							type="button"
							className={`btn btn-primary capitalize ${isConfirming && "loading"}`}
							onClick={handleConfirmAction}
						>
							{isConfirming ? "Confirming" : "Confirm"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ConfirmationOrderActionModal;
