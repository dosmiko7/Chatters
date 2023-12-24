import { useState, useEffect } from "react";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";

import formatDate from "../../../utils/formatDate";
import { IUserChat, getUser } from "../../../services/firestore/userApi";

export interface IChatsListElement {
	createdAt: Timestamp;
	userId: string;
	lastMessage: string;
	nickname: string;
	avatar: string;
	isActive: boolean;
	lastSeen: string;
}

// TODO: Change for dynamic logged user's data
const useChatsList = () => {
	//const { data } = useLoggedUser();
	//const userId = data?.uid;
	const userId = "ivKwYDsLxLkM34cMKDdw";
	const [chats, setChats] = useState<IChatsListElement[]>([]);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(
				doc(firestore, "userChats", userId),
				async (doc) => {
					const data = doc.data() as { chats: IUserChat[] };
					if (data) {
						const chats = data?.chats;

						const promises = chats.map(async (chat) => {
							const user = await getUser(chat.userId);
							return {
								userId: chat.userId,
								createdAt: chat.created_at,
								lastMessage: chat.message,
								nickname: user.data.nickname,
								avatar: user.data.avatar,
								isActive: user.data.lastLoggedIn > user.data.lastLoggedOut,
								lastSeen: formatDate(user.data.lastLoggedOut),
							};
						});
						const chatsListData = await Promise.all(promises);
						const chatListElements: IChatsListElement[] = [];
						chatListElements.push(...chatsListData);

						setError(false);
						setChats(chatListElements);
					}
				},
				() => {
					setError(true);
				}
			);

			return () => unsub();
		};
		userId && getChats();
	}, [userId]);

	return { chats, error };
};

export default useChatsList;
