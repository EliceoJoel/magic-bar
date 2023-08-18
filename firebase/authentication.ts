import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, or, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./config";
import { ISignUpUserData, ISignIpUserData, IUserFromFirebase, IUserToUpdateForFirebase } from "@/interfaces/objects";
import { UserType } from "@/constants/enums";

export async function signUpUser({ name, lastName, email, password, role, createdAt, updatedAt }: ISignUpUserData) {
	try {
		// Create user in firebase
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);

		// Save user information in firestore
		const docRef = doc(db, `users/${userCredential.user.uid}`);
		setDoc(docRef, {
			name,
			lastName,
			email,
			role,
			createdAt,
			updatedAt,
		}).catch((error) => {
			console.error("Error saving user information in firestore: ", error.message);
		});
		console.log("User created and saved successfully!");
		return { name, lastName, email, role };
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating user: ", error.message);
		} else {
			console.log("Unexpected error creating user: ", error);
		}
	}
}

export async function signInUser({ email, password }: ISignIpUserData) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const docRef = doc(db, `users/${userCredential.user.uid}`);
		const docSnap = await getDoc(docRef);
		console.log("User logged in successfully!");
		console.log(docSnap.data());
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

export async function getAllClientOrEmployeUsers() {
	const users: IUserFromFirebase[] = [];
	try {
		const usersRef = collection(db, "users");
		const userByClientOrEmployeeRoleQuery = query(
			usersRef,
			or(where("role", "==", UserType.CLIENT), where("role", "==", UserType.EMPLOYEE))
		);
		const querySnapshot = await getDocs(userByClientOrEmployeeRoleQuery);
		querySnapshot.forEach((doc) => {
			users.push({
				id: doc.id,
				name: doc.data().name,
				lastName: doc.data().lastName,
				email: doc.data().email,
				role: doc.data().role,
				createdAt: doc.data().createdAt,
				updatedAt: doc.data().updatedAt,
			});
		});
	} catch (error) {
		console.error("Error getting user by client or employee role: " + error);
	} finally {
		return sortDescUsersByDate(users);
	}
}

function sortDescUsersByDate(users: IUserFromFirebase[]) {
	return users.sort(function (a, b) {
		return new Date(b.updatedAt.seconds * 1000).getTime() - new Date(a.updatedAt.seconds * 1000).getTime();
	});
}

export async function updateUserInformation(userToUpdate: IUserToUpdateForFirebase) {
	const userRef = doc(db, "users", userToUpdate.id);
	await updateDoc(userRef, {
		name: userToUpdate.name,
		lastName: userToUpdate.lastName,
		role: userToUpdate.role,
		updatedAt: userToUpdate.updatedAt,
	}).catch((error) => {
		console.error("Error updating user in firebase: " + error.message);
	});
}

export async function deleteUser(userId: string) {
	// DEVNOTE: for the moment admin should remove user from firebase auht
	// user list manually and app will remove only colection in firestore
	try {
		await deleteDoc(doc(db, "users", userId));
	} catch (error) {
		console.error("Error trying to delete user from firestore: " + error);
	}
}
