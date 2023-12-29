import { firestore } from "../../firebase";
import {
	DocumentData,
	DocumentReference,
	Timestamp,
	collection,
	deleteDoc,
	doc,
	getDoc,
	query,
	setDoc,
	updateDoc,
	getDocs,
} from "firebase/firestore";

import { IChatMessagesData, IUserChat, getUser } from "./userApi";
import { getFileURL, removeStorageFolder, uploadChatFile } from "../storage/storageApi";

import getSecondPartOfCombinedString from "../../utils/getSecondPartOfCombinedString";

export interface TypeMessage {
	type: "image/gif" | "emoji";
	message: string;
}

export const removeChat = async ({ chatId }: { chatId: string }) => {
	const chatRef = doc(firestore, "chats", chatId);
	await deleteDoc(chatRef);
};

export const deleteChats = async ({ userId, chatId }: { userId: string | undefined; chatId: string | undefined }) => {
	if (userId === undefined || chatId === undefined) throw new Error("deleteChats: There is no ID for chat delete");

	const friendId = getSecondPartOfCombinedString({ combinedString: chatId, knownPart: userId });
	await removeUserChats({ userId, friendId });
	await removeChat({ chatId });
	await removeStorageFolder({ path: `chatFiles/${chatId}` });
};

export const updateChatsMessages = async ({
	chatId,
	senderId,
	input,
}: {
	chatId: string | undefined;
	senderId: string | undefined;
	input: FileList | string | TypeMessage;
}) => {
	if (chatId === undefined || senderId === undefined)
		throw new Error("updateChatsMessages: There is no chatId to update");
	const chatRef = doc(firestore, "chats", chatId);

	const { newMessage, userChatMessage } = await createNewMessage({ chatId, input, senderId });
	await addNewMessageToChat({ chatRef, newMessage });
	await addNewMessageToUserChat({ chatId, senderId, newMessage, userChatMessage });
};

const createNewMessage = async ({
	chatId,
	input,
	senderId,
}: {
	chatId: string;
	senderId: string;
	input: FileList | string | TypeMessage;
}) => {
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

	const user = await getUser(senderId);
	const newMessage: IChatMessagesData = {
		nickname: user.data.nickname,
		avatar: user.data.avatar,
		type: type,
		created_at: Timestamp.fromDate(new Date()),
		message: message,
		userId: senderId,
	};
	if (fileName.length) newMessage["fileName"] = fileName;

	return { newMessage, userChatMessage };
};

const addNewMessageToChat = async ({
	chatRef,
	newMessage,
}: {
	chatRef: DocumentReference<DocumentData, DocumentData>;
	newMessage: IChatMessagesData;
}) => {
	const chatSnap = await getDoc(chatRef);
	if (chatSnap.exists()) {
		const chatDoc = chatSnap.data();
		const updatedMessages = [...chatDoc.messages, newMessage];
		await updateDoc(chatRef, { messages: updatedMessages });
	} else {
		await setDoc(chatRef, { emoji: "💪", messages: [newMessage], theme: "default" });
	}
};

const addNewMessageToUserChat = async ({
	chatId,
	senderId,
	newMessage,
	userChatMessage,
}: {
	chatId: string;
	senderId: string;
	newMessage: IChatMessagesData;
	userChatMessage: string;
}) => {
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

export const updateChatsCustomization = async ({
	chatId,
	emoji,
	theme,
}: {
	chatId: string | undefined;
	emoji?: string;
	theme?: string;
}) => {
	if (chatId === undefined) throw new Error("updateChatsCustomization: There is no chatId to update");
	const chatRef = doc(firestore, "chats", chatId);

	if (emoji) await updateDoc(chatRef, { emoji });
	if (theme) await updateDoc(chatRef, { theme });
};

export const removeUserChats = async ({ userId, friendId }: { userId: string; friendId: string }) => {
	const userChatsRef = doc(firestore, "userChats", userId);
	const friendChatsRef = doc(firestore, "userChats", friendId);

	const userChatsDocSnap = await getDoc(userChatsRef);
	const friendChatsDocSnap = await getDoc(friendChatsRef);
	if (userChatsDocSnap.exists()) {
		await removeChatElement({
			userChatsRef: userChatsRef,
			data: userChatsDocSnap.data(),
			userIdChatToRemove: friendId,
		});
	}

	if (friendChatsDocSnap.exists()) {
		await removeChatElement({
			userChatsRef: friendChatsRef,
			data: friendChatsDocSnap.data(),
			userIdChatToRemove: userId,
		});
	}
};

const removeChatElement = async ({
	userChatsRef,
	data,
	userIdChatToRemove,
}: {
	userChatsRef: DocumentReference<DocumentData, DocumentData>;
	data: DocumentData;
	userIdChatToRemove: string;
}) => {
	const chats = data.chats as IChatMessagesData[];
	const updatedChats = chats.filter((chat) => chat.userId !== userIdChatToRemove);
	await updateDoc(userChatsRef, { chats: updatedChats });
};

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
		await updateDoc(userAChatRef, { chats: userChats });
	} else {
		await setDoc(userAChatRef, { chats: [message] });
	}
};

export const deleteUserChats = async ({ userId }: { userId: string }) => {
	const q = query(collection(firestore, "chats"));

	const usersChats: string[] = [];
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const id = doc.id;
		if (id.includes(userId)) usersChats.push(id);
	});

	const promises = usersChats.map(async (chatId) => {
		await deleteDoc(doc(firestore, "chats", chatId));
		await removeStorageFolder({ path: `chatFiles/${chatId}` });
	});

	try {
		await Promise.all(promises);
	} catch {
		throw new Error("deleteUsersChats: deleting chats failed");
	}
};
