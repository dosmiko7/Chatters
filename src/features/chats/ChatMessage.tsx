import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ListElement } from "../../ui/ListElement";
import { IChatElement } from "./useChat";
import { Avatar } from "../../ui/Avatar";
import ImageElement from "../../ui/ImageElement";
import AudioElement from "../../ui/AudioElement";
import VideoElement from "../../ui/VideoElement";
import DownloadElement from "../../ui/DownloadElement";

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
	theme: string;
}

const ChatMessage = (props: IChatMessageProps) => {
	const navigate = useNavigate();
	const { userId, type, fileName, avatar, currentUser, renderPhoto, message, theme } = props;

	// Styling element
	const isLeftMessage = userId !== currentUser;
	const display = renderPhoto
		? { display: "block", left: isLeftMessage ? "-5rem" : "unset", right: isLeftMessage ? "unset" : "-5rem" }
		: { display: "none" };
	const position = isLeftMessage ? { justifyContent: "flex-start" } : { justifyContent: "flex-end" };
	const color = isLeftMessage
		? { backgroundColor: `var(--${theme}-chat-left)` }
		: { backgroundColor: `var(--${theme}-chat-right)` };

	// Type of message
	let renderMessage;
	switch (true) {
		case type.includes("text"):
			renderMessage = <p>{message}</p>;
			break;

		case type.includes("emoji"):
			renderMessage = <p style={{ fontSize: "3rem" }}>{message}</p>;
			break;

		case type.includes("image"):
			renderMessage = <ImageElement fileUrl={message} />;
			break;

		case type.includes("audio"):
			renderMessage = (
				<AudioElement
					fileSrc={message}
					type={type}
				/>
			);
			break;

		case type.includes("video"):
			renderMessage = (
				<VideoElement
					fileSrc={message}
					type={type}
				/>
			);
			break;

		default:
			renderMessage = (
				<DownloadElement
					fileUrl={message}
					filename={fileName}
				/>
			);
			break;
	}

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
				<Content style={color}>{renderMessage}</Content>
			</StyledMessage>
		</MessageContainer>
	);
};

export default ChatMessage;
