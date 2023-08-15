import { db } from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { IProductFromFirebase } from "@/interfaces/objects";

export async function getAllPromotions() {
	const resultData: IProductFromFirebase[] = [];
	try {
		const promotionsRef = collection(db, "products");
		const promotionQuery = query(promotionsRef, where("promotionPrice", ">", 0));
		const querySnapshot = await getDocs(promotionQuery);
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

export async function getLastNPromotions(n: number) {
	const allPromotions = await getAllPromotions();
	try {
		const sortedPromotions = sortDescPromotionsByDate(allPromotions);
		return sortedPromotions.slice(0, n);
	} catch (error) {
		console.error(error);
	} finally {
		return allPromotions;
	}
}

function sortDescPromotionsByDate(promotions: IProductFromFirebase[]) {
	return promotions.sort(function (a, b) {
		return new Date(b.createdAt.seconds * 1000).getTime() - new Date(a.createdAt.seconds * 1000).getTime();
	});
}
