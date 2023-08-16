import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { INewComboInputs } from "@/interfaces/forms";
import { IComboModalProps } from "@/interfaces/props";
import { newComboSchema, getYupSchema, editComboSchema } from "@/yup/schemas";
import { createNewCombo, getAllCombos, getLastNCombos, updateCombo } from "@/firebase/combos";
import { comboToEditExist } from "@/utils/validation";
import { emptyCombo } from "@/constants/all";

function ComboModal({
	updateCombos,
	comboToEdit,
	changeComboToEdit,
	updateCatalogCombos,
	catalogData,
}: IComboModalProps) {
	
	const [isSavingCombo, setIsSavingCombo] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors },
	} = useForm<INewComboInputs>(
		comboToEditExist(comboToEdit) ? getYupSchema(editComboSchema) : getYupSchema(newComboSchema)
	);

	useEffect(() => {
		if (comboToEditExist(comboToEdit)) {
			setValue("name", comboToEdit.name);
			setValue("price", comboToEdit.price);
			setValue("normalPrice", comboToEdit.normalPrice);
		}
	}, [setValue, comboToEdit]);

	const handleCreateNewCombo = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingCombo(true);

		// Create new combo in firebase
		await createNewCombo({
			...data,
			image: data.image[0],
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Update combos displayed with the new created
		if (updateCombos !== null) {
			const combosUpdated = await getAllCombos();
			updateCombos(combosUpdated);
		}

		// Close modal and reset inputs
		document.getElementById("comboModal")?.click();
		reset();

		//Set loading as finished
		setIsSavingCombo(false);

		// Show a success alert message
	});

	const handleEditCombo = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingCombo(true);

		// Update combo in firebase
		await updateCombo({
			...data,
			id: comboToEdit.id,
			image: data.image[0],
			updatedAt: new Date(),
		});

		// Update combos displayed with the new edited
		if (updateCombos !== null) {
			const combosUpdated = await getAllCombos();
			updateCombos(combosUpdated);
		} else if (updateCatalogCombos !== null && catalogData !== null) {
			const updatedCombos = await getLastNCombos(5);
			const catalogUpdated = {
				...catalogData,
				combos: updatedCombos,
			};
			updateCatalogCombos(catalogUpdated);
		}

		// Close modal and reset inputs
		document.getElementById("comboModal")?.click();
		reset();
		changeComboToEdit(emptyCombo);

		//Set loading as finished
		setIsSavingCombo(false);

		// Show a success alert message
	});

	return (
		<>
			<input type="checkbox" id="comboModal" className="modal-toggle" />
			<div className="modal">
				<form
					className="modal-box relative max-w-md"
					onSubmit={comboToEditExist(comboToEdit) ? handleEditCombo : handleCreateNewCombo}
				>
					<label
						htmlFor="comboModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => {
							reset();
							changeComboToEdit(emptyCombo);
						}}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">
						{comboToEditExist(comboToEdit) ? "Edit Combo" : "New Combo"}
					</h3>
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
								className={`input input-bordered input-primary w-full ${errors.name && "input-error"}`}
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
								className={`input input-bordered input-primary w-full ${errors.price && "input-error"}`}
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
								className={`input input-bordered input-primary w-full ${errors.normalPrice && "input-error"}`}
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
								{!comboToEditExist(comboToEdit) && <span className="label-text text-red-500">&nbsp;[*]</span>}
							</label>
							<input
								id="comboImageFile"
								accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
								type="file"
								className={`file-input file-input-bordered file-input-primary w-full ${errors.image && "file-input-error"}`}
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
						<label
							htmlFor="comboModal"
							className="btn capitalize"
							onClick={() => {
								reset();
								changeComboToEdit(emptyCombo);
							}}
						>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isSavingCombo && "loading"}`}>
							{isSavingCombo ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default ComboModal;
