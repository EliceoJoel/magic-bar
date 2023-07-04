import { db } from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IProductFromFirebase } from "@/interfaces/objects";

export async function getAllPromotions() {
	try {
		const productsRef = collection(db, "products");
		const promotionQuery = query(productsRef, where("promotionPrice", ">", 0));
		const querySnapshot = await getDocs(promotionQuery);
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
