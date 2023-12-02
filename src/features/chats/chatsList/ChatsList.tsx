import { useNavigate } from "react-router-dom";

import List from "../../../ui/List";
import ChatsListElement from "./ChatsListElement";
import { IChatsListElement } from "./useChatsList";
import useChatsList from "./useChatsList";

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
				const combinedId =
					loggedUserId > friend.userId ? `${loggedUserId}${friend.userId}` : `${friend.userId}${loggedUserId}`;
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

/*
<List<IFormattedFriend>
			data={friendsList.sort((a, b) => a.dateOfLastMessage - b.dateOfLastMessage)}
			render={(friend: IFormattedFriend) => {
				return (
					<ChatsListElement
						onClickHandler={() => navigate(`chat/${friend.id}`)}
						id={friend.id}
						dateOfLastMessage={friend.dateOfLastMessage}
						key={friend.id}
						nickname={friend.nickname}
						avatar={friend.avatar}
						status={friend.status}
						lastMessage={friend.lastMessage}
					/>
				);
			}}
		/>
	);
	*/
