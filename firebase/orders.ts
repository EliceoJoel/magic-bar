import { db } from "./config";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IOrderForFirebase, IOrderFromFirebase } from "@/interfaces/objects";
import { emptyOrder } from "@/constants/all";

export async function createNewOrder(newOrder: IOrderForFirebase) {
	await addDoc(collection(db, "orders"), {
		...newOrder,
	}).catch((error) => {
		console.error("Error creating order in firebase: " + error.message);
	});
}

export async function getAllOrders() {
	const orders: IOrderFromFirebase[] = [];
	try {
		const querySnapshot = await getDocs(collection(db, "orders"));
		querySnapshot.forEach((doc) => {
			orders.push({
				id: doc.id,
				tableNumber: doc.data().tableNumber,
				details: doc.data().details,
				totalprice: doc.data().totalprice,
				status: doc.data().status,
				products: doc.data().products,
				createdAt: doc.data().createdAt,
			});
		});
	} catch (error) {
		console.error("Error getting all orders: " + error);
	} finally {
		return orders;
	}
}

export async function getOrderById(orderId: string) {
	let order: IOrderFromFirebase = emptyOrder;
	const docRef = doc(db, "orders", orderId);
	try {
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			order = {
				id: docSnap.id,
				tableNumber: docSnap.data().tableNumber,
				details: docSnap.data().details,
				totalprice: docSnap.data().totalprice,
				status: docSnap.data().status,
				products: docSnap.data().products,
				createdAt: docSnap.data().createdAt,
			};
		}
	} catch (error) {
		console.error("Error getting order by id: " + error);
	} finally {
		return order;
	}
}
