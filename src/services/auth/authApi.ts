import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	User,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	sendEmailVerification,
	sendPasswordResetEmail,
	deleteUser,
	getAdditionalUserInfo,
	EmailAuthProvider,
	reauthenticateWithCredential,
	EmailAuthCredential,
	OAuthCredential,
} from "firebase/auth";
import { auth } from "../../firebase";

export interface ISignProps {
	email: string;
	password: string;
}

export const signIn = async (props: ISignProps) => {
	const { email, password } = props;

	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authCredential = EmailAuthProvider.credential(email, password);
		return { userCredential, authCredential };
	} catch (error) {
		console.error(error);
		throw new Error("signIn: Failed to login");
	}
};

export const signUp = async (props: ISignProps) => {
	const { email, password } = props;
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error) {
		console.error(error);
		throw new Error("signUp: Failed to create a new user");
	}
};

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();

	try {
		const userCredential = await signInWithPopup(auth, provider);
		const additionalUserInfo = getAdditionalUserInfo(userCredential);
		const authCredential = GoogleAuthProvider.credentialFromResult(userCredential);

		const isNewUser = additionalUserInfo?.isNewUser;

		return { authCredential, userCredential, isNewUser };
	} catch (error) {
		console.error(error);
		throw new Error("signInWithGoogle: Failed to login");
	}
};

export const signOutUser = async () => {
	const currentUser = auth.currentUser;
	try {
		await signOut(auth);
		return currentUser;
	} catch (error) {
		console.error(error);
		throw new Error("signOutUser: Failed to sign out");
	}
};

export const sendVerificationLink = async () => {
	if (!auth.currentUser) throw new Error("sendVerificationLink: There is no user to send verification link");
	try {
		await sendEmailVerification(auth.currentUser);
	} catch (error) {
		console.error(error);
		throw new Error("sendVerificationLink: Message sending failed");
	}
};

export const sendPasswordReset = async ({ email }: { email: string }) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.error(error);
		throw new Error("sendPasswordReset: Message sending failed");
	}
};

export const deleteAccount = async ({ user }: { user: User | null | undefined }) => {
	if (!user) throw new Error("deleteAccount: There is no user/account to delete.");

	try {
		await deleteUser(user);
	} catch (error) {
		console.error(error);
		throw new Error("deleteAccount: User deletion failed");
	}
};

export const reauthenticateAccount = async ({
	user,
	credential,
}: {
	user: User | null | undefined;
	credential: EmailAuthCredential | OAuthCredential | undefined;
}) => {
	if (!user) throw new Error("reauthenticateAccount: There is no user to reauthenticate his account.");
	if (!credential) throw new Error("reauthenticateAccount: Credential not provided");

	try {
		await reauthenticateWithCredential(user, credential);
	} catch (error) {
		console.error(error);
		throw new Error("reauthenticateAccount: Account reauthentication failed");
	}
};
