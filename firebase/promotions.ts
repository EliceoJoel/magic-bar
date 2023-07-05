import { db } from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IProductFromFirebase } from "@/interfaces/objects";

export async function getAllPromotions() {
	try {
		const promotionsRef = collection(db, "products");
		const promotionQuery = query(promotionsRef, where("promotionPrice", ">", 0));
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

export async function getLastNPromotions(n: number) {
	try {
		const allPromotions = await getAllPromotions();
		if (allPromotions !== undefined) {
			const sortedPromotions = sortPromotionsByDate(allPromotions);
			return sortedPromotions.slice(0, n);
		}
	} catch (error) {
		console.error(error);
	}
}

function sortPromotionsByDate(promotions: IProductFromFirebase[]) {
	return promotions.sort(function (a, b) {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
}
