import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

interface userData {
	name: string;
	lastName: string;
	email: string;
	password: string;
	rol: string;
}

export async function signUpUser({
	name,
	lastName,
	email,
	password,
	rol,
}: userData) {
	try {
		// Create user in firebase
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		// Save user information in firestore
		const docRef = doc(db, `users/${userCredential.user.uid}`);
		setDoc(docRef, {
			name,
			lastName,
			email,
			rol,
		});
		console.log("User created and saved successfully!");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating user: ", error.message);
		 } else {
			console.log('Unexpected error creating user: ', error);
		 }
	}
}
