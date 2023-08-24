import { db, storage } from "./config";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IComboForFirebase, IComboFromFirebase, IComboToEditForFirebase } from "@/interfaces/objects";

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

export async function updateCombo(comboToEdit: IComboToEditForFirebase, previousImageUrl: string) {
	const comboRef = doc(db, "combos", comboToEdit.id);
	if (comboToEdit.image !== undefined) {
		// Update info with new image

		// Remove previous image
		await removePreviousImage(previousImageUrl);

		// Image ref in store
		const storageRef = ref(storage, `combos/${comboToEdit.image.name.split(".")[0] + uuidv4()}`);
		// Upload image to firebase store
		await uploadBytes(storageRef, comboToEdit.image)
			.then(async (snapshot) => {
				await getDownloadURL(snapshot.ref)
					.then(async (imageUrl) => {
						// Update combo in firestore including generated image url
						await updateDoc(comboRef, {
							name: comboToEdit.name,
							price: comboToEdit.price,
							normalPrice: comboToEdit.normalPrice,
							image: imageUrl,
							updatedAt: comboToEdit.updatedAt,
						}).catch((error) => {
							console.error("Error updating combo in firebase: " + error.message);
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
		await updateDoc(comboRef, {
			name: comboToEdit.name,
			price: comboToEdit.price,
			normalPrice: comboToEdit.normalPrice,
			updatedAt: comboToEdit.updatedAt,
		}).catch((error) => {
			console.error("Error updating combo in firebase: " + error.message);
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
	await deleteObject(desertRef).catch((error) => {
		console.error("Error removing old image: " + error);
	});
}

export async function getAllCombos() {
	const combos: IComboFromFirebase[] = [];
	try {
		const combosRef = collection(db, "combos");
		const orderDescQuery = query(combosRef, orderBy("updatedAt", "desc"));
		const querySnapshot = await getDocs(orderDescQuery);
		querySnapshot.forEach((doc) => {
			combos.push({
				id: doc.id,
				name: doc.data().name,
				price: doc.data().price,
				normalPrice: doc.data().normalPrice,
				image: doc.data().image,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updatedAt,
			});
		});
	} catch (error) {
		console.error(error);
	} finally {
		return combos;
	}
}

export async function getLastNCombos(n: number) {
	const resultData: IComboFromFirebase[] = [];
	try {
		const combosRef = collection(db, "combos");
		const lastNCombosQuery = query(combosRef, orderBy("updatedAt", "desc"), limit(n));
		const querySnapshot = await getDocs(lastNCombosQuery);
		querySnapshot.forEach((doc) => {
			resultData.push({
				id: doc.id,
				name: doc.data().name,
				price: doc.data().price,
				normalPrice: doc.data().normalPrice,
				image: doc.data().image,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updatedAt,
			});
		});
	} catch (error) {
		console.error(error);
	} finally {
		return resultData;
	}
}

export async function searchCombos(searchText: string) {
	const allCombos = await getAllCombos();
	return allCombos.filter((combo) => combo.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
}
