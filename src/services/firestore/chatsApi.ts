import { firestore } from "../../firebase";
import {
	DocumentData,
	DocumentReference,
	Timestamp,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

import { IChatMessagesData, IUserChat, getUser } from "./userApi";
import { getFileURL, removeChatFiles, uploadChatFile } from "../storage/storageApi";

import getSecondPartOfCombinedString from "../../utils/getSecondPartOfCombinedString";

export interface TypeMessage {
	type: "image/gif" | "emoji";
	message: string;
}

export const removeChat = async ({ chatId }: { chatId: string }) => {
	const chatRef = doc(firestore, "chats", chatId);
	await deleteDoc(chatRef).catch(() => {
		throw new Error("Error: removing chat");
	});
};

export const deleteChats = async ({ userId, chatId }: { userId: string | undefined; chatId: string | undefined }) => {
	if (userId === undefined || chatId === undefined) throw new Error("There is no ID for chat delete");

	const friendId = getSecondPartOfCombinedString({ combinedString: chatId, knownPart: userId });

	await removeUserChats({ userId, friendId });
	await removeChat({ chatId });
	await removeChatFiles({ chatId });
};

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
