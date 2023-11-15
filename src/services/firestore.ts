import { doc, setDoc, getDocs, collection, query, where, or, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { User } from "firebase/auth";
import { IProfileFormInput } from "../features/profiles/form/ProfileForm";
import { getImageURL, uploadAvatar, uploadBackground } from "./storage";
import formatFriendList, { IFormattedFriend } from "../utils/formatFriendsList";

export interface IFriend {
	friendID: string;
	messages: {
		created_at: Timestamp;
		message: string;
	}[];
}

export interface IUserData {
	nickname: string;
	avatar: string;
	background: string;
	description: string;
	email: string;
	friends_list: IFriend[];
	personals: {
		name?: string;
		surname?: string;
		birthday?: Timestamp;
		city?: string;
	};
	socials: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
	lastLoggedIn?: Timestamp;
	lastLoggedOut?: Timestamp;
}

export interface IDocumentData {
	id: string;
	data: IUserData;
}

// TODO: update lastLoggedIn when user is login
// TODO: update lastLoggedOut when user in logout (also automatically)
export const addUser = async (user: User) => {
	const defaultData: IUserData = {
		nickname: user.email || "",
		avatar:
			"https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/avatars%2FdefaultAvatar.jpg?alt=media&token=a838b971-c827-4429-bea6-09846aff6b84&_gl=1*nsekzg*_ga*MTM5MTY2MzQwMC4xNjk4ODM0MjE5*_ga_CW55HF8NVT*MTY5OTAzMDA5Ny4xMS4xLjE2OTkwMzA2MDAuNDYuMC4w",
		background:
			"https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/backgrounds%2Fbackground_default.jpg?alt=media&token=5d04ac8d-a3a4-4fc3-bd0c-686c987092c3&_gl=1*q68j4h*_ga*MTM5MTY2MzQwMC4xNjk4ODM0MjE5*_ga_CW55HF8NVT*MTY5OTE4NDAyOS4xNS4xLjE2OTkxODQxMTIuNDUuMC4w",
		description: "",
		email: user.email || "",
		friends_list: [],
		personals: {},
		socials: {},
	};

	const userIdRef = doc(firestore, "users", user.uid);

	return setDoc(userIdRef, defaultData)
		.then(() => user)
		.catch((error) => {
			throw error;
		});
};

export const updateUser = async ({ data, userID }: { data: IProfileFormInput; userID: string }): Promise<void> => {
	const userRef = doc(firestore, "users", `${userID}`);

	const filteredData = Object.fromEntries(
		Object.entries(data).filter(([, value]) => value !== undefined && value !== null && value !== "")
	);

	if (filteredData.avatar) {
		await uploadAvatar({ avatarFile: filteredData.avatar[0], userID });
		await getImageURL(`avatars/avatar_${userID}.png`).then((url) => (filteredData.avatar = url));
	}
	if (filteredData.background) {
		await uploadBackground({ backgroundFile: filteredData.background[0], userID });
		await getImageURL(`backgrounds/background_${userID}.png`).then((url) => (filteredData.background = url));
	}

	if (Object.keys(filteredData).length > 0) {
		await updateDoc(userRef, filteredData);
	}
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
	if (userId === undefined) throw new Error("Something went wrong");
	const docRef = doc(firestore, "users", `${userId}`);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { id: docSnap.id, data: docSnap.data() as IUserData };
	} else {
		throw new Error("User with such id doesnt exist");
	}
};

export const getFriendsList = async (userID: string | undefined): Promise<IFormattedFriend[]> => {
	if (!userID) throw new Error("There is no userID for getting his friends list");

	const userData = await getUser(userID);
	const friendsList = userData.data.friends_list;

	const formattedUserFriendList = await formatFriendList({ friendsList, currentUserID: userID });

	return formattedUserFriendList;
};
