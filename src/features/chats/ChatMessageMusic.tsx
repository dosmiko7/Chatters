import { useCallback } from "react";
import styled from "styled-components";

const StyledAudio = styled.audio`
	max-height: 28rem;
	width: auto;
	max-width: 100%;
`;

const ChatMessageMusic = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	const defaultVolume = useCallback((audioElement: HTMLAudioElement | null) => {
		if (audioElement) {
			audioElement.volume = 0.5;
		}
	}, []);

	return (
		<StyledAudio
			controls
			ref={defaultVolume}
		>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the audio tag.
		</StyledAudio>
	);
};

export default ChatMessageMusic;
