import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	User,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export interface ISignProps {
	email: string;
	password: string;
}

export const signIn = async (props: ISignProps): Promise<User | null> => {
	const { email, password } = props;

	return signInWithEmailAndPassword(auth, email, password)
		.then(() => auth.currentUser)
		.catch((error) => {
			throw error;
		});
};

export const signUp = async (props: ISignProps): Promise<User | null> => {
	const { email, password } = props;
	return createUserWithEmailAndPassword(auth, email, password)
		.then(() => auth.currentUser)
		.catch((error) => {
			throw error;
		});
};

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();

	return signInWithPopup(auth, provider)
		.then((result) => result.user)
		.catch((error) => {
			throw error;
		});
};

export const signOutUser = async () => {
	signOut(auth).catch((error) => {
		throw error;
	});
};

export const sendVerificationLink = async () => {
	if (!auth.currentUser) throw new Error("There is no user to send verification link");
	sendEmailVerification(auth.currentUser).catch((error) => {
		throw error;
	});
};
