import styled from "styled-components";

import { ListElement } from "../../ui/ListElement";
import { IChatElement } from "./useChat";
import { Avatar } from "../../ui/Avatar";
import { useNavigate } from "react-router-dom";

const MessageContainer = styled(ListElement)``;

const StyledMessage = styled.div`
	position: relative;
	max-width: 45%;
`;

const AvatarContainer = styled.div`
	position: absolute;
	bottom: 0;

	&:hover {
		cursor: pointer;
	}
`;

const Content = styled.div`
	border-radius: var(--border-radius-sm);
	padding: var(--padding-sm);
`;

interface IChatMessageProps extends IChatElement {
	currentUser: string;
	renderPhoto: boolean;
}

const ChatMessage = (props: IChatMessageProps) => {
	const navigate = useNavigate();
	const { userId, avatar, currentUser, renderPhoto, message } = props;

	const isLeftMessage = userId !== currentUser;
	const display = renderPhoto
		? { display: "block", left: isLeftMessage ? "-5rem" : "unset", right: isLeftMessage ? "unset" : "-5rem" }
		: { display: "none" };
	const position = isLeftMessage ? { justifyContent: "flex-start" } : { justifyContent: "flex-end" };
	const color = isLeftMessage
		? { backgroundColor: "var(--color-primary-200)" }
		: { backgroundColor: "var(--color-secondary-400)" };

	return (
		<MessageContainer
			style={position}
			nonBorder={true}
		>
			<StyledMessage>
				<AvatarContainer
					style={display}
					onClick={() => navigate(`profile/${userId}`)}
				>
					<Avatar
						size="4rem"
						src={avatar}
					/>
				</AvatarContainer>
				<Content style={color}>{message}</Content>
			</StyledMessage>
		</MessageContainer>
	);
};

export default ChatMessage;
