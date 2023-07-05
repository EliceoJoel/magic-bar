import { db, storage } from "./config";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IGameForFirebase, IGameFromFirebase } from "@/interfaces/objects";

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
	const querySnapshot = await getDocs(collection(db, "games"));
	querySnapshot.forEach((doc) => {
		games.push({
			id: doc.id,
			name: doc.data().name,
			price: doc.data().price,
			image: doc.data().image,
			createdAt: doc.data().createdAt,
		});
	});
	return games;
}

export async function getLastNGames(n: number) {
	try {
		const gamesRef = collection(db, "games");
		const lastNGamesQuery = query(gamesRef, orderBy("createdAt", "desc"), limit(n));
		const querySnapshot = await getDocs(lastNGamesQuery);
		const resultData: IGameFromFirebase[] = [];
		querySnapshot.forEach((doc) => {
			resultData.push({
				id: doc.id,
				name: doc.data().name,
				price: doc.data().price,
				image: doc.data().image,
				createdAt: doc.data().createdAt,
			});
		});
		return resultData;
	} catch (error) {
		console.error(error);
	}
}
