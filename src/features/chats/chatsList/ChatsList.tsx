import { useNavigate } from "react-router-dom";

import useChatsList, { IChatsListElement } from "./useChatsList";
import getCombinedId from "../../../utils/getCombinedId";
import List from "../../../ui/List";
import ChatsListElement from "./ChatsListElement";

// TODO: Change for dynamic currentId
const ChatsList = () => {
	const navigate = useNavigate();
	const { chats, error } = useChatsList();
	const loggedUserId = "ivKwYDsLxLkM34cMKDdw";
	if (error) return <div>Something went wrong.</div>;

	return (
		<List<IChatsListElement>
			data={chats.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)}
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
	);
};

export default ChatsList;
