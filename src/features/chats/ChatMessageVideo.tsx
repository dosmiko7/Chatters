import { useCallback } from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
	max-height: 28rem;
	width: auto;
	max-width: 100%;
`;

const ChatMessageVideo = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	const defaultVolume = useCallback((videoElement: HTMLVideoElement | null) => {
		if (videoElement) {
			videoElement.volume = 0.5;
		}
	}, []);

	return (
		<StyledVideo
			controls
			ref={defaultVolume}
		>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the video tag.
		</StyledVideo>
	);
};

export default ChatMessageVideo;
