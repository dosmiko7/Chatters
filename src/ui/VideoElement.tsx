import { useCallback } from "react";
import styled from "styled-components";

import { fileElementStyle } from "../style/Templates";

const StyledVideoElement = styled.video`
	${fileElementStyle}
`;

const VideoElement = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	const defaultVolume = useCallback((videoElement: HTMLVideoElement | null) => {
		if (videoElement) {
			videoElement.volume = 0.5;
		}
	}, []);

	return (
		<StyledVideoElement
			controls
			ref={defaultVolume}
		>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the video tag.
		</StyledVideoElement>
	);
};

export default VideoElement;
