import { Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useLoggedUser from "../../../context/useLoggedUser";
import useChatsList, { IChatsListElement } from "./useChatsList";
import useChatsSearch from "../../../context/useChatsSearch";
import getCombinedId from "../../../utils/getCombinedId";
import ErrorMessage from "../../../ui/ErrorMessage";
import List from "../../../ui/List";
import ChatsListElement from "./ChatsListElement";
import ThreeDots from "../../../ui/ThreeDots";

const ChatsList = () => {
	const navigate = useNavigate();
	const { chats, error } = useChatsList();
	const { searchValue } = useChatsSearch();
	const { loggedUser } = useLoggedUser();
	const filteredChats = useMemo(
		() =>
			chats
				.filter((chat) => chat.nickname.includes(searchValue))
				.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
		[chats, searchValue]
	);

	if (error || !loggedUser) return <ErrorMessage>Something went wrong.</ErrorMessage>;
	return (
		<Suspense fallback={<ThreeDots />}>
			<List<IChatsListElement>
				data={filteredChats}
				render={(friend: IChatsListElement) => {
					const combinedId = getCombinedId(loggedUser?.uid, friend.userId);
					return (
						<ChatsListElement
							key={friend.userId}
							onClickHandler={() =>
								navigate(`chat/${combinedId}`, {
									state: {
										nickname: friend.nickname,
										avatar: friend.avatar,
										isActive: friend.isActive,
										friendId: friend.userId,
										userId: loggedUser.uid,
										lastSeen: friend.lastSeen,
									},
								})
							}
							avatar={friend.avatar}
							nickname={friend.nickname}
							isActive={friend.isActive}
							lastMessage={friend.lastMessage}
						/>
					);
				}}
			/>
		</Suspense>
	);
};

export default ChatsList;
