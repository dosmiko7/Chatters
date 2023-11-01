import { useNavigate } from "react-router-dom";
import List from "../../ui/List";
import PrivateChatsElement from "./PrivateChatsElement";

export interface IUserProps {
	uid: number;
	nickname: string;
	avatar?: string;
	status: string;
	lastMessege: string;
	newMessege: boolean;
}

const PRIVATE_CHATS = [
	{
		uid: 1,
		nickname: "Zbychu",
		avatar: "some_url",
		status: "active",
		lastMessege: "Hello Mr. Obama",
		newMessege: true,
	},
	{
		uid: 2,
		nickname: "Stachu",
		status: "unavailable",
		lastMessege: "What is going on man? You dont respond. Give me a sign.",
		newMessege: true,
	},
	{
		uid: 3,
		nickname: "Roman",
		status: "unavailable",
		lastMessege:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet at diam iaculis gravida. Integer a augue lacus. Phasellus tellus dolor, accumsan eget nisi tempus, mollis laoreet odio. Fusce nec ullamcorper est. Cras rutrum lectus eget quam sollicitudin ornare. Donec tincidunt neque risus. Vestibulum quis luctus sapien",
		newMessege: false,
	},
];

// TODO: Chats should be sorted descending by date
// TODO: Get private chats from server
const PrivateChatsList = () => {
	const navigate = useNavigate();

	return (
		<List<IUserProps>
			data={PRIVATE_CHATS}
			render={(user: IUserProps) => {
				return (
					<PrivateChatsElement
						onClickHandler={() => navigate(`privateChat/${user.uid}`)}
						key={user.uid}
						nickname={user.nickname}
						avatar={user.avatar}
						status={user.status}
						lastMessege={user.lastMessege}
						newMessege={user.newMessege}
					/>
				);
			}}
		/>
	);
};

export default PrivateChatsList;
