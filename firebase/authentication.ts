import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

interface signUpUserData {
	name: string;
	lastName: string;
	email: string;
	password: string;
	rol: string;
}

interface signIpUserData {
	email: string;
	password: string;
}

export async function signUpUser({ name, lastName, email, password, rol }: signUpUserData) {
	try {
		// Create user in firebase
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);

		// Save user information in firestore
		const docRef = doc(db, `users/${userCredential.user.uid}`);
		setDoc(docRef, {
			name,
			lastName,
			email,
			rol,
		}).catch((error) => {
			console.error("Error saving user information in firestore: ", error.message);
		});
		console.log("User created and saved successfully!");
		return { name, lastName, email, rol };
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating user: ", error.message);
		} else {
			console.log("Unexpected error creating user: ", error);
		}
	}
}

export async function signInUser({ email, password }: signIpUserData) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const docRef = doc(db, `users/${userCredential.user.uid}`);
		const docSnap = await getDoc(docRef);
		console.log("User logged in successfully!");
		return docSnap.data();
	} catch (error) {
		if (error instanceof Error) {
			console.error("Failed to login user: ", error.message);
			return error;
		} else {
			console.log("Unexpected error to login user: ", error);
		}
	}
}
