import styled from "styled-components";

const StyledAudio = styled.audio`
	max-height: 28rem;
	width: auto;
	max-width: 100%;
`;

const ChatMessageMusic = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	return (
		<StyledAudio controls>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the audio tag.
		</StyledAudio>
	);
};

export default ChatMessageMusic;
