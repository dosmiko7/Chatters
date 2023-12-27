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
} from "firebase/auth";
import { auth } from "../../firebase";

export interface ISignProps {
	email: string;
	password: string;
}

export const signIn = async (props: ISignProps): Promise<User | null> => {
	const { email, password } = props;

	try {
		await signInWithEmailAndPassword(auth, email, password);
		return auth.currentUser;
	} catch {
		throw new Error("signIn: Failed to login");
	}
};

export const signUp = async (props: ISignProps): Promise<User | null> => {
	const { email, password } = props;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		return auth.currentUser;
	} catch {
		throw new Error("signUp: Failed to create a new user");
	}
};

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(auth, provider);
		const additionalUserInfo = getAdditionalUserInfo(result);
		const isNewUser = additionalUserInfo?.isNewUser;

		return { user: result.user, isNewUser };
	} catch {
		throw new Error("signInWithGoogle: Failed to login");
	}
};

export const signOutUser = async () => {
	const currentUser = auth.currentUser;
	try {
		await signOut(auth);
		return currentUser;
	} catch {
		throw new Error("signOutUser: Failed to sign out");
	}
};

export const sendVerificationLink = async () => {
	if (!auth.currentUser) throw new Error("sendVerificationLink: There is no user to send verification link");
	try {
		await sendEmailVerification(auth.currentUser);
	} catch {
		throw new Error("sendVerificationLink: Message sending failed");
	}
};

export const sendPasswordReset = async ({ email }: { email: string }) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch {
		throw new Error("sendPasswordReset: Message sending failed");
	}
};

export const deleteAccount = async ({ user }: { user: User | null | undefined }) => {
	if (!user) throw new Error("deleteAccount: There is no user/account to delete.");

	try {
		await deleteUser(user);
	} catch {
		throw new Error("deleteAccount: User deletion failed");
	}
};

export const updateUserProfile = async ({ displayName, photoURL }: { displayName?: string; photoURL?: string }) => {
	if (!auth.currentUser) throw new Error("updateUser: There is no user to update");

	try {
		updateProfile(auth.currentUser, { displayName, photoURL });
	} catch {
		throw new Error("updateUser: User update failed");
	}
};
