import { db, storage } from "./config";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IComboForFirebase, IComboFromFirebase } from "@/interfaces/objects";

export async function createNewCombo(newCombo: IComboForFirebase) {
	// Image ref in store
	const storageRef = ref(storage, `combos/${newCombo.image.name.split(".")[0] + uuidv4()}`);
	// Upload image to firebase store
	await uploadBytes(storageRef, newCombo.image)
		.then(async (snapshot) => {
			await getDownloadURL(snapshot.ref)
				.then(async (imageUrl) => {
					// Creating combo in firestore including generated image url
					await addDoc(collection(db, "combos"), {
						...newCombo,
						image: imageUrl,
					}).catch((error) => {
						console.error("Error creating combo in firebase: " + error.message);
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

export async function getAllCombos() {
	const combos: IComboFromFirebase[] = [];
	const querySnapshot = await getDocs(collection(db, "combos"));
	querySnapshot.forEach((doc) => {
		combos.push({
			id: doc.id,
			name: doc.data().name,
			price: doc.data().price,
			normalPrice: doc.data().normalPrice,
			image: doc.data().image,
			createdAt: doc.data().createdAt,
		});
	});
	return combos;
}

export async function getLastNCombos(n: number) {
	try {
		const combosRef = collection(db, "combos");
		const lastNCombosQuery = query(combosRef, orderBy("createdAt", "desc"), limit(n));
		const querySnapshot = await getDocs(lastNCombosQuery);
		const resultData: IComboFromFirebase[] = [];
		querySnapshot.forEach((doc) => {
			resultData.push({
				id: doc.id,
				name: doc.data().name,
				price: doc.data().price,
				normalPrice: doc.data().normalPrice,
				image: doc.data().image,
				createdAt: doc.data().createdAt,
			});
		});
		return resultData;
	} catch (error) {
		console.error(error);
	}
}
