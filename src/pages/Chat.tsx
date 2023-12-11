import { useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import Empty from "../ui/Empty";
import ChatDetail from "../features/chats/ChatDetail";

export interface IChatStateProps {
	nickname: string;
	avatar: string;
	isActive: boolean;
	lastSeen: string;
	friendId: string;
	userId: string;
}

const Chat = () => {
	const location = useLocation();

	if (!location.state) {
		return (
			<Empty
				message="Please select chat from list"
				icon={<BiArrowBack />}
			/>
		);
	}

	return <ChatDetail state={location.state} />;
};

export default Chat;
