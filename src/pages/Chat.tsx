import { useLocation, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import useLoggedUser from "../context/useLoggedUser";
import ChatDetail from "../features/chats/ChatDetail";
import Empty from "../ui/Empty";

export interface IChatStateProps {
	nickname: string;
	avatar: string;
	isActive: boolean;
	lastSeen: string;
	friendId: string;
	userId: string;
}

const Chat = () => {
	const { loggedUser } = useLoggedUser();
	const location = useLocation();
	const { combinedId } = useParams();

	if (loggedUser) {
		if (!combinedId?.includes(loggedUser.uid)) {
			<Empty
				message="Access denied"
				icon={<BiArrowBack />}
			/>;
		}
	}

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
