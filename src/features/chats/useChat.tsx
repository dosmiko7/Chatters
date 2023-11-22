import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { useParams } from "react-router-dom";
import { IChatData, getUser } from "../../services/firestore";

export interface IChatElement {
	message: string;
	userId: string;
	createdAt: Timestamp;
	nickname: string;
	avatar: string;
}

// TODO: If user will send file - add property for this (isFile or sth like this)
const useChat = () => {
	//const { data } = useLoggedUser();
	//const userID = data?.uid;
	const { combinedId: chatId } = useParams();
	const [chat, setChat] = useState<IChatElement[]>([]);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const getChat = () => {
			if (chatId) {
				const unsub = onSnapshot(
					doc(firestore, "chats", chatId),
					async (doc) => {
						const data = doc.data() as { messages: IChatData[] };
						if (data) {
							const messages = data?.messages;

							const promises = messages.map(async (message) => {
								const user = await getUser(message.userId);
								return {
									userId: message.userId,
									createdAt: message.created_at,
									nickname: user.data.nickname,
									avatar: user.data.avatar,
									message: message.message,
								};
							});
							const messagesData = await Promise.all(promises);
							const messagesElements: IChatElement[] = [];
							messagesElements.push(...messagesData);

							setError(false);
							setChat(messagesElements);
						}
					},
					() => {
						setError(true);
					}
				);

				return () => unsub();
			} else setError(true);
		};
		chatId && getChat();
	}, [chatId]);

	return { chat, error };
};

export default useChat;
