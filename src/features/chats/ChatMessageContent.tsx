import styled from "styled-components";

import ImageElement from "../../ui/ImageElement";
import AudioElement from "../../ui/AudioElement";
import VideoElement from "../../ui/VideoElement";
import DownloadElement from "../../ui/DownloadElement";
import Paragraph from "../../ui/Paragraph";

const ContentContainer = styled.div`
	border-radius: var(--border-radius-sm);
	padding: var(--padding-sm);
`;

interface IChatMessageContentProps {
	type: string;
	message: string;
	fileName?: string;
	theme: string;
	isLeftMessage: boolean;
}

const ChatMessageContent = ({ data }: { data: IChatMessageContentProps }) => {
	const { type, message, fileName, theme, isLeftMessage } = data;

	const color = isLeftMessage
		? { backgroundColor: `var(--${theme}-chat-left)` }
		: { backgroundColor: `var(--${theme}-chat-right)` };

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
