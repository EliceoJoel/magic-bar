import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { INewGameInputs } from "@/interfaces/forms";
import { IGameFromFirebase } from "@/interfaces/objects";
import { newGameSchema, getYupSchema } from "@/yup/schemas";
import { createNewGame, getAllGames } from "@/firebase/games";

function NewGameModal({ updateGames }: { updateGames: Dispatch<SetStateAction<IGameFromFirebase[]>> }) {
	const [isCreatingNewGame, setIsCreatingNewGame] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<INewGameInputs>(getYupSchema(newGameSchema));

	const handleCreateNewGame = handleSubmit(async (data) => {
		// Set loading as started
		setIsCreatingNewGame(true);

		// Create new game in firebase
		await createNewGame({
			...data,
			image: data.image[0],
			createdAt: new Date(),
		});

		// Update combos displayed with the new created
		const gamesUpdated = await getAllGames();
		updateGames(gamesUpdated);

		// Close modal and reset inputs
		document.getElementById("newGameModal")?.click();
		reset();

		//Set loading as finished
		setIsCreatingNewGame(false);

		// Show a success alert message
	});

	return (
		<>
			<input type="checkbox" id="newGameModal" className="modal-toggle" />
			<div className="modal">
				<form className="modal-box relative max-w-md" onSubmit={handleCreateNewGame}>
					<label
						htmlFor="newGameModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => reset()}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">New Game</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol <span className="text-red-500">[*]</span> need to be filled because
								they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label htmlFor="gameNameInput" className="label justify-start">
								<span className="label-text">Name</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="gameNameInput"
								type="text"
								placeholder="Type the name of the new game"
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
							<label htmlFor="gamePriceInput" className="label justify-start">
								<span className="label-text">Price</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="gamePriceInput"
								type="number"
								step={0.01}
								placeholder="Type the price of the new game"
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
							<label htmlFor="gameImageFile" className="label justify-start">
								<span className="label-text">Image</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								id="gameImageFile"
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
						<label htmlFor="newGameModal" className="btn capitalize" onClick={() => reset()}>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isCreatingNewGame && "loading"}`}>
							{isCreatingNewGame ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default NewGameModal;
