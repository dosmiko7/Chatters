import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Avatar from "../../ui/Avatar";

const AvatarContainer = styled.div`
	position: absolute;
	bottom: 0;

	&:hover {
		cursor: pointer;
	}
`;

interface IChatAvatarProps {
	isDisplayed: boolean;
	isLeftMessage: boolean;
	avatarSrc: string;
	userId: string;
}

const ChatAvatar = ({ data }: { data: IChatAvatarProps }) => {
	const { isDisplayed, isLeftMessage, avatarSrc, userId } = data;
	const navigate = useNavigate();

	const display = isDisplayed
		? { display: "block", left: isLeftMessage ? "-5rem" : "unset", right: isLeftMessage ? "unset" : "-5rem" }
		: { display: "none" };

	return (
		<AvatarContainer
			style={display}
			onClick={() => navigate(`profile/${userId}`)}
		>
			<Avatar
				size="4rem"
				src={avatarSrc}
			/>
		</AvatarContainer>
	);
};

export default ChatAvatar;
