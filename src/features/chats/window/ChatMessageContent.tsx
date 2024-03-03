import styled from "styled-components";

import ImageElement from "../../../ui/ImageElement";
import AudioElement from "../../../ui/AudioElement";
import VideoElement from "../../../ui/VideoElement";
import DownloadElement from "../../../ui/DownloadElement";
import Paragraph from "../../../ui/Paragraph";
import Wrapper from "../../../ui/Wrapper";

const ContentContainer = styled(Wrapper)`
	border-radius: var(--border-radius-sm);
	padding: var(--padding-sm);
`;

interface IChatMessageContentProps {
	type: string;
	message: string;
	fileName?: string;
	theme: {
		name: string;
		fontColor: string;
	};
	isLeftMessage: boolean;
}

const ChatMessageContent = ({ data }: { data: IChatMessageContentProps }) => {
	const { type, message, fileName, theme, isLeftMessage } = data;

	const color = isLeftMessage
		? { backgroundColor: `var(--${theme.name}-chat-left)`, color: theme.fontColor }
		: { backgroundColor: `var(--${theme.name}-chat-right)`, color: theme.fontColor };

	let renderMessage;
	switch (true) {
		case type.includes("text"):
			renderMessage = <Paragraph>{message}</Paragraph>;
			break;

		case type.includes("emoji"):
			renderMessage = <Paragraph style={{ fontSize: "3rem" }}>{message}</Paragraph>;
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

	return <ContentContainer style={color}>{renderMessage}</ContentContainer>;
};

export default ChatMessageContent;
