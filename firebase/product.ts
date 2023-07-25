import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";
import { v4 as uuidv4 } from "uuid";
import { IProductForFirebase, IProductFromFirebase, IProductToEditForFirebase } from "@/interfaces/objects";

export async function createNewProduct(newProduct: IProductForFirebase) {
	// Image ref in store
	const storageRef = ref(storage, `products/${newProduct.image.name.split(".")[0] + uuidv4()}`);
	// Upload image to firebase store
	await uploadBytes(storageRef, newProduct.image)
		.then(async (snapshot) => {
			await getDownloadURL(snapshot.ref)
				.then(async (imageUrl) => {
					// Creating product in firestore including generated image url
					await addDoc(collection(db, "products"), {
						...newProduct,
						image: imageUrl,
					}).catch((error) => {
						console.error("Error creating product in firebase: " + error.message);
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

export async function updateProduct(productToEdit: IProductToEditForFirebase) {
	const productRef = doc(db, "products", productToEdit.id);
	if (productToEdit.image !== undefined) {
		// Update info with new image

		// TODO: Remove previous image

		// Image ref in store
		const storageRef = ref(storage, `products/${productToEdit.image.name.split(".")[0] + uuidv4()}`);
		// Upload image to firebase store
		await uploadBytes(storageRef, productToEdit.image)
			.then(async (snapshot) => {
				await getDownloadURL(snapshot.ref)
					.then(async (imageUrl) => {
						// Update product in firestore including generated image url
						await updateDoc(productRef, {
							name: productToEdit.name,
							brand: productToEdit.brand,
							price: productToEdit.price,
							image: imageUrl,
							category: productToEdit.category,
							additional: productToEdit.additional,
							promotionPrice: productToEdit.promotionPrice,
							updatedAt: productToEdit.updateAt,
						}).catch((error) => {
							console.error("Error updating product in firebase: " + error.message);
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
		// Update info without new image
		await updateDoc(productRef, {
			name: productToEdit.name,
			brand: productToEdit.brand,
			price: productToEdit.price,
			category: productToEdit.category,
			additional: productToEdit.additional,
			promotionPrice: productToEdit.promotionPrice,
			updatedAt: productToEdit.updateAt,
		}).catch((error) => {
			console.error("Error updating product in firebase: " + error.message);
		});
	}
}

export async function getProductsBycategory(categoryId: string) {
	const resultData: IProductFromFirebase[] = [];
	try {
		const productsRef = collection(db, "products");
		const categoryQuery = query(productsRef, where("category", "==", categoryId));
		const querySnapshot = await getDocs(categoryQuery);
		querySnapshot.forEach((doc) => {
			resultData.push({
				id: doc.id,
				name: doc.data().name,
				brand: doc.data().brand,
				price: doc.data().price,
				category: doc.data().category,
				image: doc.data().image,
				additional: doc.data().additional,
				promotionPrice: doc.data().promotionPrice,
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
