import { Suspense, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useChatsList, { IChatsListElement } from "./useChatsList";
import { ChatsSearchContext } from "../../../context/ChatsSearchContext";
import getCombinedId from "../../../utils/getCombinedId";
import List from "../../../ui/List";
import ChatsListElement from "./ChatsListElement";
import ThreeDots from "../../../ui/ThreeDots";

// TODO: Change for Error element
// TODO: Change for dynamic currentId
const ChatsList = () => {
	const navigate = useNavigate();
	const { chats, error } = useChatsList();
	const { searchValue } = useContext(ChatsSearchContext);
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";

	const filteredChats = useMemo(
		() =>
			chats
				.filter((chat) => chat.nickname.includes(searchValue))
				.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
		[chats, searchValue]
	);

	if (error) return <div>Something went wrong.</div>;
	return (
		<Suspense fallback={<ThreeDots />}>
			<List<IChatsListElement>
				data={filteredChats}
				render={(friend: IChatsListElement) => {
					const combinedId = getCombinedId(loggedUserId, friend.userId);
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
										userId: loggedUserId,
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
