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
	updateProfile,
	UserCredential,
} from "firebase/auth";
import { auth } from "../../firebase";

export interface ISignProps {
	email: string;
	password: string;
}

export const signIn = async (props: ISignProps): Promise<UserCredential> => {
	const { email, password } = props;

	try {
		const credential = await signInWithEmailAndPassword(auth, email, password);
		return credential;
	} catch (error) {
		console.error(error);
		throw new Error("signIn: Failed to login");
	}
};

export const signUp = async (props: ISignProps): Promise<UserCredential> => {
	const { email, password } = props;
	try {
		const credential = await createUserWithEmailAndPassword(auth, email, password);
		return credential;
	} catch (error) {
		console.error(error);
		throw new Error("signUp: Failed to create a new user");
	}
};

export const signInWithGoogle = async (): Promise<{
	credential: UserCredential;
	isNewUser: boolean | undefined;
}> => {
	const provider = new GoogleAuthProvider();

	try {
		const credential = await signInWithPopup(auth, provider);
		const additionalUserInfo = getAdditionalUserInfo(credential);
		const isNewUser = additionalUserInfo?.isNewUser;

		return { credential, isNewUser };
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

export const updateUserProfile = async ({ displayName, photoURL }: { displayName?: string; photoURL?: string }) => {
	if (!auth.currentUser) throw new Error("updateUser: There is no user to update");

	try {
		updateProfile(auth.currentUser, { displayName, photoURL });
	} catch (error) {
		console.error(error);
		throw new Error("updateUser: User update failed");
	}
};
