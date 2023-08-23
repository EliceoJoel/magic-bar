import { db, storage } from "./config";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IGameForFirebase, IGameFromFirebase, IGameToEditForFirebase } from "@/interfaces/objects";

export async function createNewGame(newGame: IGameForFirebase) {
	// Image ref in store
	const storageRef = ref(storage, `games/${newGame.image.name.split(".")[0] + uuidv4()}`);
	// Upload image to firebase store
	await uploadBytes(storageRef, newGame.image)
		.then(async (snapshot) => {
			await getDownloadURL(snapshot.ref)
				.then(async (imageUrl) => {
					// Creating game in firestore including generated image url
					await addDoc(collection(db, "games"), {
						...newGame,
						image: imageUrl,
					}).catch((error) => {
						console.error("Error creating game in firebase: " + error.message);
					});
				})
				.catch((error) => {
					console.error("Error generating image url: " + error.massage);
				});
		})
		.catch((error) => {
			console.error("Error uploading image: " + error.message);
		});
}

export async function getAllGames() {
	const games: IGameFromFirebase[] = [];
	try {
		const querySnapshot = await getDocs(collection(db, "games"));
		querySnapshot.forEach((doc) => {
			games.push({
				id: doc.id,
				name: doc.data().name,
				price: doc.data().price,
				image: doc.data().image,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updateAt,
			});
		});
	} catch (error) {
		console.error(error);
	} finally {
		return games;
	}
}

export async function updateGame(gameToEdit: IGameToEditForFirebase, previousImageUrl: string) {
	const gameRef = doc(db, "games", gameToEdit.id);
	if (gameToEdit.image !== undefined) {
		// Update info with new image

		// Remove previous image
		await removePreviousImage(previousImageUrl);

		// Image ref in store
		const storageRef = ref(storage, `games/${gameToEdit.image.name.split(".")[0] + uuidv4()}`);
		// Upload image to firebase store
		await uploadBytes(storageRef, gameToEdit.image)
			.then(async (snapshot) => {
				await getDownloadURL(snapshot.ref)
					.then(async (imageUrl) => {
						// Update game in firestore including generated image url
						await updateDoc(gameRef, {
							name: gameToEdit.name,
							price: gameToEdit.price,
							image: imageUrl,
							updatedAt: gameToEdit.updatedAt,
						}).catch((error) => {
							console.error("Error updating game in firebase: " + error.message);
						});
					})
					.catch((error) => {
						console.error("Error generating updated image url: " + error.massage);
					});
			})
			.catch((error) => {
				console.error("Error uploading image: " + error.message);
			});
	} else {
		// Update info without a new image
		await updateDoc(gameRef, {
			name: gameToEdit.name,
			price: gameToEdit.price,
			updatedAt: gameToEdit.updatedAt,
		}).catch((error) => {
			console.error("Error updating game in firebase: " + error.message);
		});
	}
}

async function removePreviousImage(imageStorageUrl: string) {
	//Getting original name in firebase store
	const prevImageNameEndoded = imageStorageUrl.split("/o/")[1].split("?alt=")[0];
	const imageRef = decodeURIComponent(prevImageNameEndoded);

	// Create a reference to the file to delete
	const desertRef = ref(storage, imageRef);

	// Delete the file
	await deleteObject(desertRef)
		.catch((error) => {
			console.error("Error removing old image: " + error);
		});
}

export async function getLastNGames(n: number) {
	const resultData: IGameFromFirebase[] = [];
	try {
		const gamesRef = collection(db, "games");
		const lastNGamesQuery = query(gamesRef, orderBy("createdAt", "desc"), limit(n));
		const querySnapshot = await getDocs(lastNGamesQuery);
		querySnapshot.forEach((doc) => {
			resultData.push({
				id: doc.id,
				name: doc.data().name,
				price: doc.data().price,
				image: doc.data().image,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updateAt,
			});
		});
	} catch (error) {
		console.error(error);
	} finally {
		return resultData;
	}
}
