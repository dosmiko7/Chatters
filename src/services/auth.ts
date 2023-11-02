import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../firebase";

export interface ISignProps {
	email: string;
	password: string;
}

export const signIn = async (props: ISignProps): Promise<User> => {
	const { email, password } = props;

	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => userCredential.user)
		.catch((error) => {
			throw error;
		});
};

export const signUp = async (props: ISignProps) => {
	const { email, password } = props;
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => userCredential.user)
		.catch((error) => {
			throw error;
		});
};
