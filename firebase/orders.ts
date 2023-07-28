import { db } from "./config";
import { addDoc, collection } from "firebase/firestore";
import { IOrderForFirebase } from "@/interfaces/objects";

export async function createNewOrder(newOrder: IOrderForFirebase) {
	await addDoc(collection(db, "orders"), {
		...newOrder,
	}).catch((error) => {
		console.error("Error creating order in firebase: " + error.message);
	});
}
