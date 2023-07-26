import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { INewGameInputs } from "@/interfaces/forms";
import { newGameSchema, getYupSchema, editGameSchema } from "@/yup/schemas";
import { createNewGame, getAllGames, getLastNGames, updateGame } from "@/firebase/games";
import { IGameModalProps } from "@/interfaces/props";
import { gameToEditExist } from "@/utils/validation";
import { emptyGame } from "@/constants/all";

function GameModal({ updateGames, gameToEdit, changeGameToEdit, updateCatalogGames, catalogData }: IGameModalProps) {
	const [isSavingGame, setIsSavingGame] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors },
	} = useForm<INewGameInputs>(
		gameToEditExist(gameToEdit) ? getYupSchema(editGameSchema) : getYupSchema(newGameSchema)
	);

	useEffect(() => {
		if (gameToEditExist(gameToEdit)) {
			setValue("name", gameToEdit.name);
			setValue("price", gameToEdit.price);
		}
	}, [setValue, gameToEdit]);

	const handleCreateNewGame = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingGame(true);

		// Create new game in firebase
		await createNewGame({
			...data,
			image: data.image[0],
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Update games displayed with the new created
		if (updateGames !== null) {
			const gamesUpdated = await getAllGames();
			updateGames(gamesUpdated);
		}

		// Close modal and reset inputs
		document.getElementById("gameModal")?.click();
		reset();

		//Set loading as finished
		setIsSavingGame(false);

		// Show a success alert message
	});

	const handleEditGame = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingGame(true);

		// Update game information in firebase
		await updateGame({
			...data,
			id: gameToEdit.id,
			image: data.image[0],
			updatedAt: new Date(),
		});

		// Update games displayed with the edited game
		if (updateGames !== null) {
			const gamesUpdated = await getAllGames();
			updateGames(gamesUpdated);
		} else if (updateCatalogGames !== null && catalogData !== null) {
			const updatedGames = await getLastNGames(5);
			const catalogUpdated = {
				...catalogData,
				games: updatedGames,
			};
			updateCatalogGames(catalogUpdated);
		}

		// Close modal and reset inputs
		document.getElementById("gameModal")?.click();
		reset();
		changeGameToEdit(emptyGame);

		//Set loading as finished
		setIsSavingGame(false);

		// Show a success alert message
	});

	return (
		<>
			<input type="checkbox" id="gameModal" className="modal-toggle" />
			<div className="modal">
				<form
					className="modal-box relative max-w-md"
					onSubmit={gameToEditExist(gameToEdit) ? handleEditGame : handleCreateNewGame}
				>
					<label
						htmlFor="gameModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => {
							reset();
							changeGameToEdit(emptyGame);
						}}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">{gameToEditExist(gameToEdit) ? "Edit Game" : "New Game"}</h3>
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
								{!gameToEditExist(gameToEdit) && <span className="label-text text-red-500">&nbsp;[*]</span>}
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
						<label
							htmlFor="gameModal"
							className="btn capitalize"
							onClick={() => {
								reset();
								changeGameToEdit(emptyGame);
							}}
						>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isSavingGame && "loading"}`}>
							{isSavingGame ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default GameModal;
