import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { useParams } from "react-router-dom";
import { IChatData } from "../../services/firestore";

export interface IChatElement {
	type: string;
	fileName: string | undefined;
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
	const [emoji, setEmoji] = useState<string>("💪");
	const [theme, setTheme] = useState<string>("default");
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const getChat = () => {
			if (chatId) {
				const unsub = onSnapshot(
					doc(firestore, "chats", chatId),
					async (doc) => {
						const data = doc.data() as IChatData;
						if (data) {
							const messagesData = data?.messages;
							const messages = messagesData.map((message) => {
								return {
									type: message.type,
									fileName: message.fileName,
									userId: message.userId,
									createdAt: message.created_at,
									nickname: message.nickname,
									avatar: message.avatar,
									message: message.message,
								};
							});

							setError(false);
							setChat(messages);
							setEmoji(data.emoji);
							setTheme(data.theme);
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

	return { chat, emoji, theme, error };
};

export default useChat;
