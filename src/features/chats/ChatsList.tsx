import { useNavigate } from "react-router-dom";
import List from "../../ui/List";
import ChatsListElement from "./ChatsListElement";
import { IChatsListElement } from "./useChatsList";
import useChatsList from "./useChatsList";

const ChatsList = () => {
	const navigate = useNavigate();
	const { chats, error } = useChatsList();
	if (error) return <div>Something went wrong.</div>;

	return (
		<List<IChatsListElement>
			data={chats.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)}
			render={(friend: IChatsListElement) => {
				return (
					<ChatsListElement
						key={friend.userId}
						onClickHandler={() => navigate(`chat/${friend.userId}`)}
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
