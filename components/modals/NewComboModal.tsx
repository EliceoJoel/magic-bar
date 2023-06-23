import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { INewComboInputs } from "@/interfaces/forms";
import { IComboFromFirebase } from "@/interfaces/objects";
import { newComboSchema, getYupSchema } from "@/yup/schemas";
import { createNewCombo, getAllCombos } from "@/firebase/combos";

function NewComboModal({ updateCombos }: { updateCombos: Dispatch<SetStateAction<IComboFromFirebase[]>> }) {
	const [isCreatingNewCombo, setIsCreatingNewCombo] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<INewComboInputs>(getYupSchema(newComboSchema));

	const handleCreateNewCombo = handleSubmit(async (data) => {
		// Set loading as started
		setIsCreatingNewCombo(true);

		// Create new combo in firebase
		await createNewCombo({
			...data,
			image: data.image[0],
			createdAt: new Date(),
		});

		// Update combos displayed with the new created
		const combosUpdated = await getAllCombos();
		updateCombos(combosUpdated);

		// Close modal and reset inputs
		document.getElementById("newComboModal")?.click();
		reset();

		//Set loading as finished
		setIsCreatingNewCombo(false);

		// Show a success alert message
	});

	return (
		<>
			<input type="checkbox" id="newComboModal" className="modal-toggle" />
			<div className="modal">
				<form className="modal-box relative max-w-md" onSubmit={handleCreateNewCombo}>
					<label
						htmlFor="newComboModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => reset()}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">New Combo</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol <span className="text-red-500">[*]</span> need to be filled because
								they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label htmlFor="comboNameInput" className="label justify-start">
								<span className="label-text">Name</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="comboNameInput"
								type="text"
								placeholder="Type the name of the new combo"
								className="input input-bordered input-primary w-full"
								{...register("name")}
							/>
							{errors.name && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.name.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="comboPriceInput" className="label justify-start">
								<span className="label-text">Price</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="comboPriceInput"
								type="number"
								step={0.01}
								placeholder="Type the promotional price of the new combo"
								className="input input-bordered input-primary w-full"
								{...register("price")}
							/>
							{errors.price && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.price.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="comboNormalPriceInput" className="label justify-start">
								<span className="label-text">Normal price</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="comboNormalPriceInput"
								type="number"
								step={0.01}
								placeholder="Type the normal price of the new combo"
								className="input input-bordered input-primary w-full"
								{...register("normalPrice")}
							/>
							{errors.normalPrice && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.normalPrice.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="comboImageFile" className="label justify-start">
								<span className="label-text">Image</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								id="comboImageFile"
								accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
								type="file"
								className="file-input file-input-bordered file-input-primary w-full"
								{...register("image")}
							/>
							{errors.image && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.image.message}
								</span>
							)}
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="newComboModal" className="btn capitalize" onClick={() => reset()}>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isCreatingNewCombo && "loading"}`}>
							{isCreatingNewCombo ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default NewComboModal;
