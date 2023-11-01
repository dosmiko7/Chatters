import List from "../../ui/List";
import PrivateChatsElement from "./PrivateChatsElement";

export interface IChatProps {
	nickname: string;
	avatar?: string;
	status: string;
	lastMessege: string;
	newMessege: boolean;
}

const PRIVATE_CHATS = [
	{ nickname: "Zbychu", avatar: "some_url", status: "active", lastMessege: "Hello Mr. Obama", newMessege: true },
	{
		nickname: "Stachu",
		status: "unavailable",
		lastMessege: "What is going on man? You dont respond. Give me a sign.",
		newMessege: true,
	},
	{
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
	return (
		<List<IChatProps>
			data={PRIVATE_CHATS}
			render={(chat: IChatProps) => {
				return (
					<PrivateChatsElement
						key={Math.random()}
						nickname={chat.nickname}
						avatar={chat.avatar}
						status={chat.status}
						lastMessege={chat.lastMessege}
						newMessege={chat.newMessege}
					/>
				);
			}}
		/>
	);
};

export default PrivateChatsList;
