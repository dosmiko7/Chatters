import styled from "styled-components";

import { ListElement } from "../../ui/ListElement";
import { IChatElement } from "./useChat";
import ChatAvatar from "./ChatAvatar";
import ChatMessageContent from "./ChatMessageContent";

const StyledMessage = styled.div`
	position: relative;
	max-width: 45%;
`;

interface IChatMessageProps extends IChatElement {
	currentUser: string;
	renderPhoto: boolean;
	theme: string;
}

const ChatMessage = (props: IChatMessageProps) => {
	const { userId, type, fileName, avatar, currentUser, renderPhoto, message, theme } = props;

	// Styling element
	const isLeftMessage = userId !== currentUser;
	const position = isLeftMessage ? { justifyContent: "flex-start" } : { justifyContent: "flex-end" };

	const avatarData = { isDisplayed: renderPhoto, avatarSrc: avatar, isLeftMessage, userId };
	const messageContentData = { type, message, fileName, theme, isLeftMessage };

	return (
		<ListElement
			style={position}
			nonBorder
		>
			<StyledMessage>
				<ChatAvatar data={avatarData} />
				<ChatMessageContent data={messageContentData} />
			</StyledMessage>
		</ListElement>
	);
};

export default ChatMessage;
