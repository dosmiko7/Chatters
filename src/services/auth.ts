import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface ISignInProps {
	email: string;
	password: string;
}

export const signIn = (props: ISignInProps) => {
	const { email, password } = props;
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("signIn: ", user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("signIn: ", errorCode, errorMessage);
		});
};

export const signUp = (props: ISignInProps) => {
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
