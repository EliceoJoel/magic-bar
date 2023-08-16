import { db } from "./config";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
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
		const ordersRef = collection(db, "orders");
		const orderByDescQuery = query(ordersRef, orderBy("updatedAt", "desc"));
		const querySnapshot = await getDocs(orderByDescQuery);
		querySnapshot.forEach((doc) => {
			orders.push({
				id: doc.id,
				tableNumber: doc.data().tableNumber,
				details: doc.data().details,
				totalprice: doc.data().totalprice,
				status: doc.data().status,
				products: doc.data().products,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updatedAt,
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
				updatedAt: docSnap.data().updatedAt,
			};
		}
	} catch (error) {
		console.error("Error getting order by id: " + error);
	} finally {
		return order;
	}
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
	const orderRef = doc(db, "orders", orderId);
	await updateDoc(orderRef, {
		status: newStatus,
		updatedAt: new Date(),
	}).catch((error) => {
		console.error("Error updating order status in firebase: " + error.message);
	});
}

export async function getOrdersByStatus(status: string) {
	const orders: IOrderFromFirebase[] = [];
	try {
		const ordersRef = collection(db, "orders");
		const ordersByStatusQuery = query(ordersRef, where("status", "==", status));
		const querySnapshot = await getDocs(ordersByStatusQuery);
		querySnapshot.forEach((doc) => {
			orders.push({
				id: doc.id,
				tableNumber: doc.data().tableNumber,
				details: doc.data().details,
				totalprice: doc.data().totalprice,
				status: doc.data().status,
				products: doc.data().products,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updatedAt,
			});
		});
	} catch (error) {
		console.error("Error getting orders by status: " + error);
	} finally {
		return sortDescOrdersByDate(orders);
	}
}

function sortDescOrdersByDate(orders: IOrderFromFirebase[]) {
	return orders.sort(function (a, b) {
		return new Date(b.updatedAt.seconds * 1000).getTime() - new Date(a.updatedAt.seconds * 1000).getTime();
	});
}
