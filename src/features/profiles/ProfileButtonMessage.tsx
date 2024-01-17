import { useNavigate } from "react-router-dom";
import { BiSolidEnvelope } from "react-icons/bi";

import ButtonProfile from "../../ui/ButtonProfile";
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
			<ButtonProfile onClick={() => onMessageHandler()}>
				<BiSolidEnvelope style={{ fontSize: "2.4rem" }} />
				<span>Write a message</span>
			</ButtonProfile>
		);
	else return null;
};

export default ProfileButtonMessage;
