import { useNavigate } from "react-router-dom";
import List from "../../ui/List";
import PrivateChatsElement from "./PrivateChatsElement";
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

// TODO: Chats should be sorted descending by date
// TODO: Get private chats from server
const PrivateChatsList = () => {
	const navigate = useNavigate();
	const { friendsList, status } = useFriendsList();

	if (status === "pending") return <Spinner />;
	if (status === "error") return <div>Something went wrong.</div>;

	return (
		<List<IFormattedFriend>
			data={friendsList}
			render={(friend: IFormattedFriend) => {
				return (
					<PrivateChatsElement
						onClickHandler={() => navigate(`chat/${friend.id}`)}
						id={friend.id}
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

export default PrivateChatsList;
