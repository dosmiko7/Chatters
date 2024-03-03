import { useNavigate } from "react-router-dom";
import { BiSolidEnvelope } from "react-icons/bi";

import Button from "../../ui/Button";
import getCombinedId from "../../utils/getCombinedId";

export interface IChatData {
	nickname: string;
	avatar: string;
	isActive: boolean;
	lastSeen: string;
	friendId: string;
	userId: string;
}

const ProfileButtonMessage = ({ isFriend, chatData }: { isFriend: boolean; chatData: IChatData }) => {
	const navigate = useNavigate();
	const { friendId, userId } = chatData;
	if (userId === friendId) return null;

	const onMessageHandler = () => {
		const chatId = getCombinedId(userId, friendId);
		navigate(`/chat/${chatId}`, {
			state: chatData,
		});
	};

	if (isFriend)
		return (
			<Button
				variant="profile"
				size="small"
				onClick={() => onMessageHandler()}
			>
				<BiSolidEnvelope style={{ fontSize: "2.4rem" }} />
				<span>Write a message</span>
			</Button>
		);
	else return null;
};

export default ProfileButtonMessage;
