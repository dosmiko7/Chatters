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

	// signInWithEmailAndPassword(auth, email, password)
	// 	.then((userCredential) => {
	// 		const user = userCredential.user;
	// 		console.log("signIn: ", user);
	// 		return user;
	// 	})
	// 	.catch((error) => {
	// 		throw error;
	// 	});
};

export const signUp = (props: ISignProps) => {
	const { email, password } = props;
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("signUp: ", user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("signUp: ", errorCode, errorMessage);
		});
};
