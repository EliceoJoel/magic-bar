import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";
import { v4 as uuidv4 } from "uuid";
import { IProductForFirebase, IProductFromFirebase } from "@/interfaces/objects";

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

export async function getProductsBycategory(categoryId: string) {
	try {
		const productsRef = collection(db, "products");
		const categoryQuery = query(productsRef, where("category", "==", categoryId));
		const querySnapshot = await getDocs(categoryQuery);
		const resultData: IProductFromFirebase[] = [];
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
			});
		});
		return resultData;
	} catch (error) {
		console.error(error);
	}
}
