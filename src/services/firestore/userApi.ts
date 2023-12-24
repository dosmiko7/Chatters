import { firestore } from "../../firebase";
import { User } from "firebase/auth";
import {
	DocumentData,
	DocumentReference,
	Timestamp,
	collection,
	doc,
	getDoc,
	getDocs,
	or,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";

import { deleteChats } from "./chatsApi";
import { getFileURL, uploadAvatar, uploadBackground } from "../storage/storageApi";

import { IProfileFormInput } from "../../features/profiles/form/ProfileForm";
import formatSubmit from "../../utils/formatSubmit";
import getCombinedId from "../../utils/getCombinedId";

export interface IUserChat {
	userId: string;
	created_at: Timestamp;
	message: string;
	avatar: string;
	nickname: string;
	type: string;
}

export interface IChatMessagesData {
	nickname: string;
	avatar: string;
	type: string;
	fileName?: string;
	userId: string;
	created_at: Timestamp;
	message: string;
}

export interface IChatData {
	emoji: string;
	theme: string;
	messages: IChatMessagesData[];
}

export interface IFriendData {
	id: string;
	avatar: string;
	nickname: string;
}

export interface IUserData {
	nickname: string;
	avatar: string;
	background: string;
	description: string;
	email: string;
	friends_list: IFriendData[];
	personals: {
		name?: string;
		surname?: string;
		birthday?: string;
		city?: string;
	};
	socials: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
	lastLoggedIn: Timestamp;
	lastLoggedOut: Timestamp;
}

export interface IDocumentData {
	id: string;
	data: IUserData;
}

// TODO: update lastLoggedIn when user is login
// TODO: update lastLoggedOut when user in logout (also automatically)
// TODO: remove await if you are using then().catch()

const DEFAULT_AVATAR =
	"https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/avatars%2FdefaultAvatar.jpg?alt=media&token=a838b971-c827-4429-bea6-09846aff6b84&_gl=1*nsekzg*_ga*MTM5MTY2MzQwMC4xNjk4ODM0MjE5*_ga_CW55HF8NVT*MTY5OTAzMDA5Ny4xMS4xLjE2OTkwMzA2MDAuNDYuMC4w";

const DEFAULT_BACKGROUND =
	"https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/backgrounds%2Fbackground_default.jpg?alt=media&token=5d04ac8d-a3a4-4fc3-bd0c-686c987092c3&_gl=1*q68j4h*_ga*MTM5MTY2MzQwMC4xNjk4ODM0MjE5*_ga_CW55HF8NVT*MTY5OTE4NDAyOS4xNS4xLjE2OTkxODQxMTIuNDUuMC4w";

export const addUser = async (user: User | null) => {
	if (!user) throw new Error("There is no user to add.");

	const defaultData: IUserData = {
		nickname: user.email || "",
		avatar: DEFAULT_AVATAR,
		background: DEFAULT_BACKGROUND,
		description: "",
		email: user.email || "",
		friends_list: [],
		personals: {},
		socials: {},
		lastLoggedIn: Timestamp.fromDate(new Date()),
		lastLoggedOut: Timestamp.fromDate(new Date()),
	};

	const userIdRef = doc(firestore, "users", user.uid);

	return setDoc(userIdRef, defaultData)
		.then(() => user)
		.catch((error) => {
			throw error;
		});
};

export const updateUser = async ({
	input,
	userId,
	data,
}: {
	input: IProfileFormInput;
	userId: string | undefined;
	data: IUserData | undefined;
}): Promise<IUserData> => {
	if (!userId || !data) throw new Error("There is no user to update");
	const userRef = doc(firestore, "users", `${userId}`);

	let avatarUrl: string = "";
	if (input.avatar) {
		await uploadAvatar({ avatarFile: input.avatar[0], userId });
		await getFileURL(`avatars/avatar_${userId}.png`).then((url) => (avatarUrl = url));
	}

	let backgroundUrl: string = "";
	if (input.background) {
		await uploadBackground({ backgroundFile: input.background[0], userId });
		await getFileURL(`backgrounds/background_${userId}.png`).then((url) => (backgroundUrl = url));
	}

	const formattedData = formatSubmit({ ...input, avatar: avatarUrl, background: backgroundUrl }, data);

	if (Object.keys(formattedData).length > 0) {
		await updateDoc(userRef, formattedData).catch((error) => {
			throw error;
		});
	}

	return formattedData;
};

export const findUsers = async (key: string): Promise<IDocumentData[]> => {
	const q = query(collection(firestore, "users"), or(where("nickname", "==", key), where("email", "==", key)));

	const querySnapshot = await getDocs(q);
	const foundUsers: IDocumentData[] = [];
	querySnapshot.forEach((doc) => {
		foundUsers.push({ id: doc.id, data: doc.data() as IUserData });
	});
	return foundUsers;
};

export const getUser = async (userId: string | undefined): Promise<IDocumentData> => {
	if (userId === undefined) throw new Error("UserId should be defined");
	const docRef = doc(firestore, "users", userId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { id: docSnap.id, data: docSnap.data() as IUserData };
	} else {
		throw new Error("User with such id doesnt exist");
	}
};

export const updateFriendsList = async ({
	userId,
	friendId,
	mode,
}: {
	userId: string;
	friendId: string;
	mode: "add" | "remove";
}) => {
	const userDocRef = doc(firestore, "users", userId);
	const userDocSnap = await getDoc(userDocRef);
	const friendDocRef = doc(firestore, "users", friendId);
	const friendDocSnap = await getDoc(friendDocRef);

	const updateList = async ({
		documentRef,
		data,
		userIdToChange,
	}: {
		documentRef: DocumentReference<DocumentData, DocumentData>;
		data: DocumentData;
		userIdToChange: string;
	}) => {
		const friendsList = data.friends_list as IFriendData[];
		let updatedFriendsList: IFriendData[] = [];
		if (mode === "add") {
			const user = await getUser(userIdToChange);
			const addedUser: IFriendData = {
				id: userIdToChange,
				avatar: user.data.avatar,
				nickname: user.data.nickname,
			};
			updatedFriendsList = [addedUser, ...friendsList];
		}
		if (mode === "remove") updatedFriendsList = friendsList.filter((friend) => friend.id !== userIdToChange);
		await updateDoc(documentRef, { friends_list: updatedFriendsList }).catch((error) => {
			throw error;
		});
	};

	if (userDocSnap.exists()) {
		await updateList({ documentRef: userDocRef, data: userDocSnap.data(), userIdToChange: friendId });
	}

	if (friendDocSnap.exists()) {
		await updateList({ documentRef: friendDocRef, data: friendDocSnap.data(), userIdToChange: userId });
	}
};

export const friendUpdate = async ({
	userId,
	friendId,
	mode,
}: {
	userId: string | undefined;
	friendId: string | undefined;
	mode: "add" | "remove";
}) => {
	if (userId === undefined || friendId === undefined) throw new Error("There is no ID for friend update");

	if (mode === "add") {
		await updateFriendsList({ userId, friendId, mode: "add" });
	} else if (mode === "remove") {
		await updateFriendsList({ userId, friendId, mode: "remove" });
		const chatId = getCombinedId(userId, friendId);
		await deleteChats({ userId, chatId });
	}
};
