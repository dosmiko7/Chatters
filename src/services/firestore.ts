import {
	doc,
	setDoc,
	getDocs,
	collection,
	query,
	where,
	or,
	getDoc,
	Timestamp,
	updateDoc,
	DocumentData,
	DocumentReference,
	deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { User } from "firebase/auth";
import { getFileURL, removeChatFiles, uploadAvatar, uploadBackground, uploadChatFile } from "./storage";
import formatSubmit from "../utils/formatSubmit";
import getSecondPartOfCombinedString from "../utils/getSecondPartOfCombinedString";
import { IProfileFormInput } from "../features/profiles/form/ProfileForm";
import getCombinedId from "../utils/getCombinedId";

export interface IUserChat {
	userId: string;
	created_at: Timestamp;
	message: string;
	avatar: string;
	nickname: string;
	type: string;
}

interface IChatMessagesData {
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

// users collection
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
	if (userId === undefined) throw new Error("Something went wrong");
	const docRef = doc(firestore, "users", userId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { id: docSnap.id, data: docSnap.data() as IUserData };
	} else {
		throw new Error("User with such id doesnt exist");
	}
};

// export const getFriends = async (friends: string[] | undefined): Promise<IFriendData[]> => {
// 	if (friends === undefined) throw new Error("Something went wrong with friends fetching");
// 	try {
// 		const promises = friends.map(async (friendId) => {
// 			const user = await getUser(friendId);
// 			return {
// 				id: friendId,
// 				avatar: user.data.avatar,
// 				nickname: user.data.nickname,
// 			};
// 		});

// 		const friendsData = await Promise.all(promises);
// 		const friendsElements: IFriendData[] = [];
// 		friendsElements.push(...friendsData);

// 		return friendsElements;
// 	} catch (err) {
// 		throw new Error("Error fetching friends");
// 	}
// };

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

// userChats Collection
const updateUserChats = async ({
	userAId,
	userBId,
	message,
}: {
	userAId: string;
	userBId: string;
	message: IChatMessagesData;
}) => {
	const userAChatRef = doc(firestore, "userChats", userAId);
	const userAChatSnap = await getDoc(userAChatRef);

	if (userAChatSnap.exists()) {
		let userChats = userAChatSnap.data().chats as IUserChat[];
		let chatChanged = false;
		for (let i = 0; i < userChats.length; i++) {
			if (userChats[i].userId === userBId) {
				userChats[i] = message;
				chatChanged = true;
				break;
			}
		}
		if (!chatChanged) userChats = [...userChats, message];
		await updateDoc(userAChatRef, { chats: userChats }).catch((error) => {
			throw error;
		});
	} else {
		await setDoc(userAChatRef, { chats: [message] }).catch((error) => {
			throw error;
		});
	}
};

export const removeUserChats = async ({ userId, friendId }: { userId: string; friendId: string }) => {
	const userChatsRef = doc(firestore, "userChats", userId);
	const userChatsDocSnap = await getDoc(userChatsRef);
	const friendChatsRef = doc(firestore, "userChats", friendId);
	const friendChatsDocSnap = await getDoc(friendChatsRef);

	const removeChatElement = async ({
		documentRef,
		data,
		userIdChatToRemove,
	}: {
		documentRef: DocumentReference<DocumentData, DocumentData>;
		data: DocumentData;
		userIdChatToRemove: string;
	}) => {
		const chats = data.chats as IChatMessagesData[];
		const updatedChats = chats.filter((chat) => chat.userId !== userIdChatToRemove);
		await updateDoc(documentRef, { chats: updatedChats }).catch((error) => {
			throw error;
		});
	};

	if (userChatsDocSnap.exists()) {
		await removeChatElement({ documentRef: userChatsRef, data: userChatsDocSnap.data(), userIdChatToRemove: friendId });
	}

	if (friendChatsDocSnap.exists()) {
		await removeChatElement({
			documentRef: friendChatsRef,
			data: friendChatsDocSnap.data(),
			userIdChatToRemove: userId,
		});
	}
};

export const updateChatsCustomization = async ({
	chatId,
	emoji,
	theme,
}: {
	chatId: string | undefined;
	emoji?: string;
	theme?: string;
}) => {
	if (chatId === undefined) throw new Error("Something went wrong with chat customization update.");
	const chatRef = doc(firestore, "chats", chatId);

	if (emoji) {
		await updateDoc(chatRef, { emoji }).catch((error) => {
			throw error;
		});
	}

	if (theme) {
		await updateDoc(chatRef, { theme }).catch((error) => {
			throw error;
		});
	}
};

export const removeChat = async ({ chatId }: { chatId: string }) => {
	const chatRef = doc(firestore, "chats", chatId);
	await deleteDoc(chatRef).catch((err: Error) => {
		throw err;
	});
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

export const deleteChats = async ({ userId, chatId }: { userId: string | undefined; chatId: string | undefined }) => {
	if (userId === undefined || chatId === undefined) throw new Error("There is no ID for chat delete");

	const friendId = getSecondPartOfCombinedString({ combinedString: chatId, knownPart: userId });

	await removeUserChats({ userId, friendId });
	await removeChat({ chatId });
	await removeChatFiles({ chatId });
};

export interface TypeMessage {
	type: "image/gif" | "emoji";
	message: string;
}

export const updateChatsMessages = async ({
	chatId,
	senderId,
	input,
}: {
	chatId: string | undefined;
	senderId: string;
	input: FileList | string | TypeMessage;
}) => {
	if (chatId === undefined) throw new Error("Something went wrong with chat update.");
	const chatRef = doc(firestore, "chats", chatId);
	const chatSnap = await getDoc(chatRef);
	const user = await getUser(senderId);

	let type = "text";
	let fileName = "";
	let message: string;
	let userChatMessage: string;

	// If input is a file
	if (input instanceof FileList) {
		const [file] = input;
		const fileSeed = Date.now().toString();
		const fileSrc = `${fileSeed}_${file.name}`;
		await uploadChatFile({ chatId, fileName: fileSrc, chatFile: file });
		message = await getFileURL(`chatFiles/${chatId}/${fileSrc}`);
		fileName = file.name;
		userChatMessage = `${fileName} has been sent.`;
		type = file.type;
	}
	// If input is normal message
	else if (typeof input === "string") {
		message = input;
		userChatMessage = message;
	}
	// If input is a gif from Giphy or it is Emoji
	else {
		type = input.type;
		message = input.message;
		userChatMessage = input.type === "emoji" ? message : "GIF has been sent.";
	}

	const newMessage: IChatMessagesData = {
		nickname: user.data.nickname,
		avatar: user.data.avatar,
		type: type,
		created_at: Timestamp.fromDate(new Date()),
		message: message,
		userId: senderId,
	};
	if (fileName.length) newMessage["fileName"] = fileName;

	// Update chats
	if (chatSnap.exists()) {
		const chatDoc = chatSnap.data();
		const updatedMessages = [...chatDoc.messages, newMessage];
		await updateDoc(chatRef, { messages: updatedMessages }).catch((error) => {
			throw error;
		});
	} else {
		await setDoc(chatRef, { emoji: "💪", messages: [newMessage], theme: "default" }).catch((error) => {
			throw error;
		});
	}

	// Update userChats
	const receiverId = getSecondPartOfCombinedString({ combinedString: chatId, knownPart: senderId });
	await updateUserChats({
		userAId: senderId,
		userBId: receiverId,
		message: { ...newMessage, message: userChatMessage, userId: receiverId },
	});
	await updateUserChats({
		userAId: receiverId,
		userBId: senderId,
		message: { ...newMessage, message: userChatMessage, userId: senderId },
	});
};
