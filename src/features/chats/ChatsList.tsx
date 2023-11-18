import { useNavigate } from "react-router-dom";
import List from "../../ui/List";
import ChatsListElement from "./ChatsListElement";
import useFriendsList from "./useFriendsList";
import { IFormattedFriend } from "../../utils/formatFriendsList";
import Spinner from "../../ui/Spinner";
// import Spinner from "../../ui/Spinner";
// import Link from "../../ui/Link";

export interface IUserProps {
	uid: number;
	nickname: string;
	avatar: string;
	status: string;
	lastMessege: string;
	newMessege: boolean;
}

// TODO: Get private chats from server
const ChatsList = () => {
	const navigate = useNavigate();
	const { friendsList, status } = useFriendsList();

	if (status === "pending") return <Spinner />;
	if (status === "error") return <div>Something went wrong.</div>;

	return (
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
};

export default ChatsList;
