import { useState } from "react";
import { deleteUser, getAllClientOrEmployeUsers } from "@/firebase/authentication";
import { IDeleteUserConfirmationModalProps } from "@/interfaces/props";

function DeleteUserConfirmationModal({ userId, updateUsers }: IDeleteUserConfirmationModalProps) {
	const [isConfirming, setIsConfirming] = useState(false);

	const handleConfirmAction = async () => {
		// Set loading as started
		setIsConfirming(true);

		// Remove user in firestore
		await deleteUser(userId);

		// Get all users updated and show them
		const userlistUpdated = await getAllClientOrEmployeUsers();
		updateUsers(userlistUpdated);

		// Close modal and reset inputs
		document.getElementById("deleteUserConfirmationModal")?.click();

		// Set loading as finished
		setIsConfirming(false);

		// Show a success alert message
	};

	return (
		<>
			<input type="checkbox" id="deleteUserConfirmationModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-md">
					<label
						htmlFor="deleteUserConfirmationModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">Confirmation</h3>
					<div className="flex flex-col gap-2">
						<p>Are you sure to delete this user?</p>
						<p>Remember delete this user in firebase auth panel as well</p>
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

export default DeleteUserConfirmationModal;
