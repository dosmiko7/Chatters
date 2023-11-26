import styled from "styled-components";

const StyledVideo = styled.video`
	max-height: 28rem;
	width: auto;
	max-width: 100%;
`;

const ChatMessageVideo = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	return (
		<StyledVideo controls>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the video tag.
		</StyledVideo>
	);
};

export default ChatMessageVideo;
