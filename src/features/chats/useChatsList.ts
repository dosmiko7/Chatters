import { useState, useEffect } from "react";
import { getUser } from "../../services/firestore";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";

interface IChatData {
	created_at: Timestamp;
	userId: string;
	last_message: string;
}

export interface IChatsListElement {
	createdAt: Timestamp;
	userId: string;
	lastMessage: string;
	nickname: string;
	avatar: string;
	isActive: boolean;
}

// TODO: Change for dynamic logged user's data
const useChatsList = () => {
	//const { data } = useLoggedUser();
	//const userID = data?.uid;
	const userId = "ivKwYDsLxLkM34cMKDdw";
	const [chats, setChats] = useState<IChatsListElement[]>([]);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(
				doc(firestore, "userChats", userId),
				async (doc) => {
					const data = doc.data() as { chats: IChatData[] };
					if (data) {
						const chats = data?.chats;

						const promises = chats.map(async (chat) => {
							const user = await getUser(chat.userId);
							return {
								userId: chat.userId,
								createdAt: chat.created_at,
								nickname: user.data.nickname,
								lastMessage: chat.last_message,
								avatar: user.data.avatar,
								isActive: user.data.lastLoggedOut > user.data.lastLoggedIn,
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
